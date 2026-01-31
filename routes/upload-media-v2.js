const express = require('express');
const path = require('path');
const fs = require('fs');

/**
 * @swagger
 * /api/upload-media-v2:
 *   post:
 *     summary: Upload base64-encoded media and return a public URL
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
 *                 description: Data URL or raw base64
 *               fileName:
 *                 type: string
 *                 example: photo.jpg
 *               userId:
 *                 type: integer
 *                 nullable: true
 *                 example: 45
 *               mediaType:
 *                 type: string
 *                 nullable: true
 *                 example: image
 *               folder:
 *                 type: string
 *                 nullable: true
 *                 example: listings
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

const EXT_BY_MIME = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'video/mp4': 'mp4',
  'video/quicktime': 'mov',
  'video/webm': 'webm',
  'audio/mp4': 'm4a',
  'audio/mpeg': 'mp3',
  'audio/ogg': 'ogg',
  'application/octet-stream': 'bin',
};

function stripDataUrlPrefix(s) {
  const i = s.indexOf(',');
  return i === -1 ? s : s.slice(i + 1);
}

function detectContentType(base64Data, mediaType) {
  if (typeof base64Data !== 'string') return 'application/octet-stream';
  if (base64Data.startsWith('data:')) {
    const m = base64Data.match(/^data:([^;,]+)/);
    if (m && m[1]) return m[1];
  }
  if (mediaType === 'voice') return 'audio/mp4';
  if (mediaType === 'video') return 'video/mp4';
  if (mediaType === 'image' || mediaType === 'listing') return 'image/jpeg';

  const clean = stripDataUrlPrefix(base64Data).replace(/\s/g, '');
  const first = clean.substring(0, 30);
  if (first.startsWith('/9j/')) return 'image/jpeg';
  if (first.startsWith('iVBORw')) return 'image/png';
  if (first.startsWith('R0lGOD')) return 'image/gif';
  if (first.startsWith('UklGR')) return 'image/webp';
  if (first.includes('ftyp') || first.includes('moov') || first.includes('mdat')) return 'video/mp4';
  if (first.startsWith('GkXfo')) return 'video/webm';
  if (first.startsWith('T2dnU')) return 'audio/ogg';
  if (first.startsWith('SUQz') || first.startsWith('//uQ')) return 'audio/mpeg';
  return 'application/octet-stream';
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

router.post('/', async (req, res) => {
  try {
    const { base64Data, fileName, userId, mediaType, folder } = req.body || {};

    if (!base64Data || typeof base64Data !== 'string') {
      return res.status(400).json({ error: 'No base64Data provided' });
    }

    const contentType = detectContentType(base64Data, mediaType);
    const isVideo = contentType.startsWith('video/');

    const maxVideoSize = 50 * 1024 * 1024;
    const maxImageSize = 10 * 1024 * 1024;
    const estimatedSize = Math.floor(base64Data.length * 0.75);

    if (isVideo && estimatedSize > maxVideoSize) {
      return res.status(400).json({ error: 'Video file too large. Maximum size is 50MB.' });
    }
    if (!isVideo && estimatedSize > maxImageSize) {
      return res.status(400).json({ error: 'Image file too large. Maximum size is 10MB.' });
    }

    const raw = stripDataUrlPrefix(base64Data).replace(/\s/g, '');
    const buffer = Buffer.from(raw, 'base64');
    if (!buffer || buffer.length === 0) {
      return res.status(400).json({ error: 'Decoded data is empty' });
    }

    const timestamp = Date.now();
    const randomId = Math.random().toString(36).slice(2, 10);
    const ext = EXT_BY_MIME[contentType] || (contentType.split('/')[1] || 'bin');
    const finalName = fileName || `${timestamp}-${randomId}.${ext}`;

    // Determine local storage folder structure (mimics buckets/paths concept)
    let relPath;
    if (mediaType === 'voice') {
      relPath = path.join('voice-messages', 'chat', String(userId || 'anonymous'), finalName);
    } else if (mediaType === 'listing' || mediaType === 'video' || folder === 'listings') {
      relPath = path.join('vehicle-images', 'listings', isVideo ? 'videos' : 'images', finalName);
    } else if (mediaType === 'profile') {
      relPath = path.join('profile-photos', String(userId || 'anonymous'), finalName);
    } else {
      relPath = path.join('vehicle-images', 'chat', String(userId || 'anonymous'), finalName);
    }

    const absPath = path.join(BASE_DIR, relPath);
    ensureDir(path.dirname(absPath));
    fs.writeFileSync(absPath, buffer);

    const publicUrl = `${req.protocol}://${req.get('host')}/uploads/${relPath.split(path.sep).join('/')}`;

    return res.json({
      success: true,
      url: publicUrl,
      contentType,
      size: buffer.length,
      isVideo,
      fileName: finalName,
      path: relPath.split(path.sep).join('/'),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

module.exports = router;
