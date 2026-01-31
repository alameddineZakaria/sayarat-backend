
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { imageUrl, make, model, year, mileage, action } = await req.json();
    
    const gatewayApiKey = Deno.env.get("GATEWAY_API_KEY");
    if (!gatewayApiKey) {
      throw new Error("API Gateway key not configured");
    }

    let prompt = '';
    
    if (action === 'analyze_features') {
      // Auto-tag features from photo
      prompt = `You are an expert automotive analyst. Analyze this car image and identify all visible features and characteristics.

Return a JSON object with the following structure:
{
  "detected_features": ["feature1", "feature2", ...],
  "body_type": "Sedan|SUV|Truck|Coupe|Hatchback|Wagon|Van|Convertible",
  "exterior_color": "color name",
  "condition_estimate": "Excellent|Good|Fair|Poor",
  "confidence": 0.0-1.0
}

Focus on identifying:
- Exterior features (sunroof, alloy wheels, LED lights, roof rails, etc.)
- Body style and type
- Color
- Overall condition based on visible wear
- Any premium features visible

Only include features you can clearly see in the image. Be accurate and conservative.`;

    } else if (action === 'suggest_price') {
      // Price suggestion based on vehicle details
      prompt = `You are an expert automotive market analyst specializing in the Lebanese car market.

Based on the following vehicle details, suggest a fair market price range in USD:
- Make: ${make || 'Unknown'}
- Model: ${model || 'Unknown'}
- Year: ${year || 'Unknown'}
- Mileage: ${mileage || 'Unknown'} km

Consider:
1. Lebanese market conditions and pricing
2. Import costs and taxes in Lebanon
3. Currency fluctuations (USD pricing)
4. Typical depreciation rates
5. Model popularity in Lebanon

Return a JSON object:
{
  "suggested_price_low": number,
  "suggested_price_high": number,
  "suggested_price_mid": number,
  "market_analysis": "brief explanation",
  "price_factors": ["factor1", "factor2", ...],
  "confidence": 0.0-1.0
}

Prices should be in USD. Be realistic for the Lebanese market.`;

    } else if (action === 'generate_title') {
      // Auto-suggest listing title
      prompt = `Generate an attractive, professional listing title for a car sale ad.

Vehicle details:
- Make: ${make || 'Unknown'}
- Model: ${model || 'Unknown'}
- Year: ${year || 'Unknown'}
- Mileage: ${mileage || 'Unknown'} km

Return a JSON object:
{
  "suggested_titles": [
    "title option 1",
    "title option 2",
    "title option 3"
  ],
  "description_template": "A brief, compelling description template"
}

Make titles concise, professional, and appealing to buyers. Include key selling points.`;
    } else {
      throw new Error("Invalid action. Use 'analyze_features', 'suggest_price', or 'generate_title'");
    }

    const messages = [];
    
    if (action === 'analyze_features' && imageUrl) {
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: imageUrl } }
        ]
      });
    } else {
      messages.push({ role: 'user', content: prompt });
    }

    const response = await fetch('https://ai.gateway.fastrouter.io/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': gatewayApiKey
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'AI request failed');
    }

    const content = data.choices?.[0]?.message?.content || '';
    
    // Try to parse JSON from the response
    let result;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } else {
        result = { raw_response: content };
      }
    } catch (parseError) {
      result = { raw_response: content };
    }

    return new Response(JSON.stringify({
      success: true,
      action,
      result
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
});
