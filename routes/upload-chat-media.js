const express = require('express');
const path = require('path');
const fs = require('fs');

/**
 * @swagger
 * /api/upload-chat-media:
 *   post:
 *     summary: Upload chat media (base64) and return a public URL
 *     tags:
 *       - Media
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               base64Data:
 *                 type: string
 *               userId:
 *                 type: integer
 *                 nullable: true
 *               fileName:
 *                 type: string
 *                 example: image.png
 *               mediaType:
 *                 type: string
 *                 nullable: true
 *                 example: chat
 *             required: [base64Data, fileName]
 *     responses:
 *       200:
 *         description: Uploaded
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

const router = express.Router();

const BASE_DIR = path.join(__dirname, '..', 'public', 'uploads');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function stripDataUrl(b64) {
  const commaIndex = b64.indexOf(',');
  return commaIndex === -1 ? b64 : b64.slice(commaIndex + 1);
}

router.post('/', async (req, res) => {
  try {
    const { base64Data, userId, fileName, mediaType = 'chat' } = req.body || {};
    if (!base64Data || typeof base64Data !== 'string') {
      return res.status(400).json({ error: 'No base64Data provided' });
    }

    const cleanBase64 = stripDataUrl(base64Data.replace(/\s/g, ''));
    const buffer = Buffer.from(cleanBase64, 'base64');
    if (!buffer.length) {
      return res.status(400).json({ error: 'Decoded data is empty' });
    }

    const ext = (fileName && path.extname(fileName).replace('.', '')) || (mediaType === 'voice' ? 'm4a' : 'jpg');

    const timestamp = Date.now();
    const rand = Math.random().toString(36).slice(2, 10);
    const finalName = fileName || `${timestamp}-${rand}.${ext}`;

    const relPath = path.join('chat', userId || 'anonymous');
    const absDir = path.join(BASE_DIR, relPath);
    ensureDir(absDir);

    const absFile = path.join(absDir, finalName);
    fs.writeFileSync(absFile, buffer);

    const publicUrl = `${req.protocol}://${req.get('host')}/uploads/${relPath.replace(/\\/g, '/')}/${encodeURIComponent(finalName)}`;

    return res.json({
      success: true,
      url: publicUrl,
      path: `${relPath.replace(/\\/g, '/')}/${finalName}`,
      size: buffer.length,
    });
  } catch (err) {
    console.error('upload-chat-media error:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
});

module.exports = router;
