const express = require('express');
const fetch = require('node-fetch');
const sequelize = require('../config/db');

/**
 * @swagger
 * /api/send-push-notification:
 *   post:
 *     summary: Send a push notification to a user
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 45
 *               title:
 *                 type: string
 *                 example: New message
 *               titleAr:
 *                 type: string
 *                 nullable: true
 *               body:
 *                 type: string
 *                 example: You received a new message
 *               bodyAr:
 *                 type: string
 *                 nullable: true
 *               data:
 *                 type: object
 *                 nullable: true
 *               type:
 *                 type: string
 *                 nullable: true
 *                 example: message
 *             required: [userId, title, body]
 *     responses:
 *       200:
 *         description: Sent
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

const router = express.Router();

function pickText(lang, enText, arText) {
  return lang === 'ar' && arText ? arText : enText;
}

router.post('/', async (req, res) => {
  try {
    const { userId, title, titleAr, body, bodyAr, data, type } = req.body || {};

    if (!userId || !title || !body) {
      return res.status(400).json({ error: 'Missing required fields: userId, title, body' });
    }

    const [tokenRows] = await sequelize.query(
      'SELECT token FROM push_tokens WHERE user_id = :userId AND is_active = true',
      { replacements: { userId } }
    );

    if (!tokenRows || tokenRows.length === 0) {
      return res.json({ success: true, message: 'No push tokens found for user', sent: 0 });
    }

    let userLanguage = 'en';
    try {
      const [prefRows] = await sequelize.query(
        'SELECT language FROM user_preferences WHERE user_id = :userId LIMIT 1',
        { replacements: { userId } }
      );
      if (prefRows && prefRows[0] && prefRows[0].language) userLanguage = prefRows[0].language;
    } catch (_) {
      // ignore
    }

    const finalTitle = pickText(userLanguage, title, titleAr);
    const finalBody = pickText(userLanguage, body, bodyAr);

    let channelId = 'default';
    if (type === 'new_message') channelId = 'messages';
    else if (type === 'price_drop') channelId = 'price_alerts';
    else if (type === 'saved_search_match') channelId = 'saved_searches';

    const messages = tokenRows.map((t) => ({
      to: t.token,
      sound: 'default',
      title: finalTitle,
      body: finalBody,
      data: { ...(data || {}), type, timestamp: new Date().toISOString() },
      channelId,
      priority: type === 'new_message' || type === 'offer' ? 'high' : 'default',
    }));

    const expoPushResponse = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages),
    });

    if (!expoPushResponse.ok) {
      const errorText = await expoPushResponse.text();
      throw new Error('Expo push failed: ' + errorText);
    }

    const expoPushResult = await expoPushResponse.json();
    const results = expoPushResult.data || [];
    const successCount = results.filter((r) => r.status === 'ok').length;
    const errorCount = results.filter((r) => r.status === 'error').length;

    // Mark invalid tokens inactive
    const invalidTokens = results
      .map((r, i) => ({ r, token: tokenRows[i]?.token }))
      .filter((x) => x.r?.status === 'error' && x.r?.details?.error === 'DeviceNotRegistered')
      .map((x) => x.token)
      .filter(Boolean);

    for (const token of invalidTokens) {
      await sequelize.query(
        'UPDATE push_tokens SET is_active = false WHERE token = :token',
        { replacements: { token } }
      );
    }

    return res.json({
      success: true,
      sent: successCount,
      errors: errorCount,
      invalidTokensRemoved: invalidTokens.length,
    });
  } catch (error) {
    console.error('Push notification error:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

module.exports = router;
