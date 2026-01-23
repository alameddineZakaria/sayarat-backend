const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const sequelize = require('../config/db');
const { PHOTO_TAGS } = require('../utils/constants'); // extract your constants


/**
 * @swagger
 * /api/photo-tagger:
 *   post:
 *     summary: Analyze vehicle photos and assign tags
 *     tags:
 *       - Photo Tagger
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               photos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     uri:
 *                       type: string
 *                 example:
 *                   - id: "1"
 *                     uri: "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg"
 *     responses:
 *       200:
 *         description: Successfully analyzed photos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PhotoAnalysis'
 *                 tagDefinitions:
 *                   type: object
 *       400:
 *         description: No photos provided
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
  try {
    const { photos } = req.body;

    if (!photos || !Array.isArray(photos) || photos.length === 0) {
      return res.status(400).json({ error: 'No photos provided' });
    }

    const gatewayApiKey = process.env.GATEWAY_API_KEY;
    if (!gatewayApiKey) {
      return res.status(500).json({ error: 'API Gateway key not configured' });
    }

    const results = [];
    const batchSize = 5;

    for (let i = 0; i < photos.length; i += batchSize) {
      const batch = photos.slice(i, i + batchSize);

      const batchPromises = batch.map(async (photo) => {
        try {
          const prompt = `Analyze this vehicle photo and identify what view/angle it shows.
Respond with ONLY a JSON object in this exact format (no markdown):
{"tag": "TAG_NAME", "confidence": 0.95, "description": "Brief description"}
Choose tag from: ${Object.keys(PHOTO_TAGS).join(', ')}`;

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
                    { type: 'image_url', image_url: { url: photo.uri, detail: 'low' } }
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

          let parsed;
          try {
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
          } catch {
            parsed = null;
          }

          const tag = parsed?.tag && PHOTO_TAGS[parsed.tag] ? parsed.tag : 'unknown';

          return {
            photoId: photo.id,
            tag,
            confidence: Math.min(1, Math.max(0.5, parsed?.confidence || 0.7)),
            description: parsed?.description || PHOTO_TAGS[tag].description,
            sortOrder: PHOTO_TAGS[tag].sortOrder
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
      if (i + batchSize < photos.length) await new Promise(r => setTimeout(r, 500));
    }

    results.sort((a, b) => a.sortOrder - b.sortOrder);

    return res.json({ success: true, results, tagDefinitions: PHOTO_TAGS });

  } catch (error) {
    console.error('AI Photo Tagger error:', error);
    return res.status(500).json({ error: error.message || 'Failed to analyze photos' });
  }
});

module.exports = router;