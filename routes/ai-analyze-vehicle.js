// routes/ai-analyze-vehicle.js
const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AI Vehicle
 *   description: AI-powered vehicle analysis and price/title suggestions
 */

/**
 * @swagger
 * /api/ai-analyze-vehicle:
 *   post:
 *     summary: Analyze vehicle features, suggest price, or generate title
 *     tags: [AI Vehicle]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [analyze_features, suggest_price, generate_title]
 *                 description: Type of AI action to perform
 *               imageUrl:
 *                 type: string
 *                 description: URL of the vehicle image (required for analyze_features)
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               mileage:
 *                 type: integer
 *     responses:
 *       200:
 *         description: AI result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 action:
 *                   type: string
 *                 result:
 *                   type: object
 *       500:
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */

router.post('/', async (req, res) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
  };

  if (req.method === 'OPTIONS') {
    return res.set(corsHeaders).send('ok');
  }

  try {
    const { imageUrl, make, model, year, mileage, action } = req.body;

    const gatewayApiKey = process.env.GATEWAY_API_KEY; 
    if (!gatewayApiKey) { 
      throw new Error('API Gateway key not configured');
    }

    let prompt = '';

    if (action === 'analyze_features') {
      prompt = `You are an expert automotive analyst. Analyze this car image and identify all visible features and characteristics.
Return a JSON object with:
{
  "detected_features": ["feature1", "feature2", ...],
  "body_type": "Sedan|SUV|Truck|Coupe|Hatchback|Wagon|Van|Convertible",
  "exterior_color": "color name",
  "condition_estimate": "Excellent|Good|Fair|Poor",
  "confidence": 0.0-1.0
}
Focus on exterior features, body type, color, and visible condition. Only include what you can clearly see.`;
    } else if (action === 'suggest_price') {
      prompt = `You are an expert automotive market analyst specializing in the Lebanese car market.
Based on these vehicle details, suggest a fair market price range in USD:
- Make: ${make || 'Unknown'}
- Model: ${model || 'Unknown'}
- Year: ${year || 'Unknown'}
- Mileage: ${mileage || 'Unknown'} km
Return JSON:
{
  "suggested_price_low": number,
  "suggested_price_high": number,
  "suggested_price_mid": number,
  "market_analysis": "brief explanation",
  "price_factors": ["factor1", "factor2", ...],
  "confidence": 0.0-1.0
}`;
    } else if (action === 'generate_title') {
      prompt = `Generate an attractive, professional listing title for a car sale ad.
Vehicle details:
- Make: ${make || 'Unknown'}
- Model: ${model || 'Unknown'}
- Year: ${year || 'Unknown'}
- Mileage: ${mileage || 'Unknown'} km
Return JSON:
{
  "suggested_titles": ["title1","title2","title3"],
  "description_template": "brief description template"
}`;
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
    if (!response.ok) throw new Error(data.error?.message || 'AI request failed');

    const content = data.choices?.[0]?.message?.content || '';
    let result;
    try {
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/\{[\s\S]*\}/);
      result = jsonMatch ? JSON.parse(jsonMatch[1] || jsonMatch[0]) : { raw_response: content };
    } catch {
      result = { raw_response: content };
    }

    res.json({ success: true, action, result });
  } catch (error) {
    console.error('AI analyze vehicle error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
