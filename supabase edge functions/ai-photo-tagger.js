export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

interface PhotoAnalysis {
  photoId: string;
  tag: string;
  confidence: number;
  description: string;
  sortOrder: number;
}

const PHOTO_TAGS = {
  'front': { sortOrder: 1, description: 'Exterior front view' },
  'front-angle': { sortOrder: 2, description: 'Front 3/4 angle view' },
  'side-left': { sortOrder: 3, description: 'Left side profile' },
  'side-right': { sortOrder: 4, description: 'Right side profile' },
  'rear-angle': { sortOrder: 5, description: 'Rear 3/4 angle view' },
  'rear': { sortOrder: 6, description: 'Exterior rear view' },
  'interior-front': { sortOrder: 7, description: 'Front interior/dashboard' },
  'interior-rear': { sortOrder: 8, description: 'Rear seats' },
  'dashboard': { sortOrder: 9, description: 'Dashboard/instrument cluster' },
  'infotainment': { sortOrder: 10, description: 'Infotainment screen' },
  'steering': { sortOrder: 11, description: 'Steering wheel' },
  'seats': { sortOrder: 12, description: 'Seats detail' },
  'trunk': { sortOrder: 13, description: 'Trunk/cargo area' },
  'engine': { sortOrder: 14, description: 'Engine bay' },
  'wheels': { sortOrder: 15, description: 'Wheels/tires' },
  'headlights': { sortOrder: 16, description: 'Headlights detail' },
  'taillights': { sortOrder: 17, description: 'Taillights detail' },
  'badge': { sortOrder: 18, description: 'Brand badge/emblem' },
  'detail': { sortOrder: 19, description: 'Other detail shot' },
  'unknown': { sortOrder: 20, description: 'Unidentified view' }
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { photos } = await req.json();
    
    if (!photos || !Array.isArray(photos) || photos.length === 0) {
      return new Response(JSON.stringify({ error: 'No photos provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const gatewayApiKey = Deno.env.get("GATEWAY_API_KEY");
    if (!gatewayApiKey) {
      throw new Error("API Gateway key not configured");
    }

    const results: PhotoAnalysis[] = [];
    
    // Process photos in batches of 5 to avoid rate limits
    const batchSize = 5;
    for (let i = 0; i < photos.length; i += batchSize) {
      const batch = photos.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (photo: { id: string; uri: string }) => {
        try {
          // Build the prompt for image analysis
          const prompt = `Analyze this vehicle photo and identify what view/angle it shows. 
          
Respond with ONLY a JSON object in this exact format (no markdown, no explanation):
{"tag": "TAG_NAME", "confidence": 0.95, "description": "Brief description"}

Choose the tag from these options:
- front: Full front view of vehicle exterior
- front-angle: Front 3/4 angle showing front and side
- side-left: Left side profile view
- side-right: Right side profile view  
- rear-angle: Rear 3/4 angle showing rear and side
- rear: Full rear view of vehicle exterior
- interior-front: Front cabin interior view
- interior-rear: Rear seats view
- dashboard: Dashboard and instrument cluster
- infotainment: Center screen/infotainment system
- steering: Steering wheel close-up
- seats: Seat detail shot
- trunk: Trunk or cargo area
- engine: Engine bay/compartment
- wheels: Wheel and tire detail
- headlights: Headlight detail
- taillights: Taillight detail
- badge: Brand badge or emblem
- detail: Other detail shot
- unknown: Cannot identify the view

Confidence should be between 0.5 and 1.0 based on how certain you are.`;

          const response = await fetch('https://ai.gateway.fastrouter.io/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': gatewayApiKey
            },
            body: JSON.stringify({
              model: 'google/gemini-2.5-flash',
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: prompt },
                    { 
                      type: 'image_url', 
                      image_url: { 
                        url: photo.uri,
                        detail: 'low' // Use low detail for faster processing
                      } 
                    }
                  ]
                }
              ],
              temperature: 0.3,
              max_tokens: 200
            })
          });

          if (!response.ok) {
            console.error(`AI API error for photo ${photo.id}:`, await response.text());
            return {
              photoId: photo.id,
              tag: 'unknown',
              confidence: 0.5,
              description: 'Could not analyze photo',
              sortOrder: PHOTO_TAGS['unknown'].sortOrder
            };
          }

          const data = await response.json();
          const content = data.choices?.[0]?.message?.content || '';
          
          // Parse the JSON response
          let parsed;
          try {
            // Try to extract JSON from the response
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              parsed = JSON.parse(jsonMatch[0]);
            } else {
              throw new Error('No JSON found in response');
            }
          } catch (parseError) {
            console.error(`Parse error for photo ${photo.id}:`, parseError, content);
            return {
              photoId: photo.id,
              tag: 'unknown',
              confidence: 0.5,
              description: 'Could not parse AI response',
              sortOrder: PHOTO_TAGS['unknown'].sortOrder
            };
          }

          const tag = parsed.tag && PHOTO_TAGS[parsed.tag as keyof typeof PHOTO_TAGS] 
            ? parsed.tag 
            : 'unknown';
          
          return {
            photoId: photo.id,
            tag,
            confidence: Math.min(1, Math.max(0.5, parsed.confidence || 0.7)),
            description: parsed.description || PHOTO_TAGS[tag as keyof typeof PHOTO_TAGS].description,
            sortOrder: PHOTO_TAGS[tag as keyof typeof PHOTO_TAGS].sortOrder
          };
        } catch (error) {
          console.error(`Error analyzing photo ${photo.id}:`, error);
          return {
            photoId: photo.id,
            tag: 'unknown',
            confidence: 0.5,
            description: 'Error analyzing photo',
            sortOrder: PHOTO_TAGS['unknown'].sortOrder
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Small delay between batches to avoid rate limiting
      if (i + batchSize < photos.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    // Sort results by sortOrder
    results.sort((a, b) => a.sortOrder - b.sortOrder);

    return new Response(JSON.stringify({ 
      success: true,
      results,
      tagDefinitions: PHOTO_TAGS
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    console.error('AI Photo Tagger error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to analyze photos'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
});