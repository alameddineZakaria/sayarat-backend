const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const { VoiceMessage } = require("../models");

/**
 * @swagger
 * /api/voice/upload:
 *   post:
 *     summary: Upload voice message
 *     tags: [Voice]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - base64Audio
 *             properties:
 *               base64Audio:
 *                 type: string
 *               userId:
 *                 type: string
 *               fileName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Upload successful
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/voice/upload", async (req, res) => {
  try {
    const { base64Audio, userId, fileName } = req.body;

    if (!base64Audio) {
      return res.status(400).json({ error: "No audio data provided" });
    }

    // Decode base64
    const audioBuffer = Buffer.from(base64Audio, "base64");

    // Limit size (5MB example)
    if (audioBuffer.length > 5 * 1024 * 1024) {
      return res.status(400).json({ error: "Audio file too large" });
    }

    const uploadsDir = path.join(__dirname, "..", "uploads", "voice");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const safeFileName =
      fileName ||
      `voice_${userId || "anon"}_${crypto.randomUUID()}.m4a`;

    const filePath = path.join(uploadsDir, safeFileName);

    // Save file
    fs.writeFileSync(filePath, audioBuffer);

    // Save DB record
    const record = await VoiceMessage.create({
      user_id: userId || null,
      file_name: safeFileName,
      file_path: `/uploads/voice/${safeFileName}`,
      file_size: audioBuffer.length,
    });

    return res.json({
      success: true,
      id: record.id,
      url: record.file_path,
    });
  } catch (error) {
    console.error("Voice upload error:", error);
    return res.status(500).json({
      error: "Upload failed",
    });
  }
});

module.exports = router;
