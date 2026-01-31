const express = require('express');
const sequelize = require('../config/db');

/**
 * @swagger
 * /api/generate-video-thumbnail:
 *   post:
 *     summary: Generate a thumbnail from a video URL
 *     tags:
 *       - Media
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               videoUrl:
 *                 type: string
 *                 example: https://example.com/video.mp4
 *               listingId:
 *                 type: integer
 *                 nullable: true
 *                 example: 123
 *               timestampSeconds:
 *                 type: integer
 *                 nullable: true
 *                 example: 1
 *             required: [videoUrl]
 *     responses:
 *       200:
 *         description: Thumbnail generated
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { videoUrl, listingId, timestampSeconds = 1 } = req.body || {};
    if (!videoUrl) {
      return res.status(400).json({ error: 'videoUrl is required' });
    }

    // Store metadata (placeholder - actual thumbnail generation is client-side)
    try {
      await sequelize.query(
        `INSERT INTO video_thumbnails (video_url, listing_id, status, created_at)
         VALUES (:video_url, :listing_id, :status, NOW())
         ON CONFLICT (video_url) DO UPDATE SET
           listing_id = EXCLUDED.listing_id,
           status = EXCLUDED.status,
           updated_at = NOW()`,
        {
          replacements: {
            video_url: videoUrl,
            listing_id: listingId || null,
            status: 'pending',
          },
        }
      );
    } catch (e) {
      // If table doesn't exist or no conflict index, don't fail the request
    }

    return res.json({
      success: true,
      videoUrl,
      thumbnailUrl: null,
      timestampSeconds,
      status: 'client_extract',
      message: 'Thumbnail extraction delegated to client (extract a frame at the given timestamp).',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

module.exports = router;
