const express = require('express');
const fetch = require('node-fetch');
const sequelize = require('../config/db');

/**
 * @swagger
 * /api/send-message-notification:
 *   post:
 *     summary: Send message notification (push/email depending on configuration)
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipientId:
 *                 type: integer
 *                 example: 10
 *               senderId:
 *                 type: integer
 *                 example: 20
 *               senderName:
 *                 type: string
 *                 example: John Doe
 *               messageContent:
 *                 type: string
 *                 example: Hello!
 *               conversationId:
 *                 type: string
 *                 example: conv_abc123
 *               vehicleTitle:
 *                 type: string
 *                 nullable: true
 *             required: [recipientId, senderId, senderName, messageContent]
 *     responses:
 *       200:
 *         description: Sent
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

const router = express.Router();

function isInQuietHours(prefs) {
  if (!prefs || !prefs.quiet_hours_enabled) return false;
  const now = new Date();
  const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
  const currentDay = days[now.getDay()];
  const quietDays = prefs.quiet_hours_days || [];
  if (!quietDays.includes(currentDay)) return false;
  const startHour = parseInt(String(prefs.quiet_hours_start || '22:00:00').split(':')[0], 10);
  const endHour = parseInt(String(prefs.quiet_hours_end || '08:00:00').split(':')[0], 10);
  const h = now.getHours();
  if (startHour > endHour) return h >= startHour || h < endHour;
  return h >= startHour && h < endHour;
}

router.post('/', async (req, res) => {
  try {
    const { recipientId, senderId, senderName, messageContent, conversationId, vehicleTitle } = req.body || {};
    if (!recipientId || !senderId || !messageContent || !conversationId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if muted
    const [mutedRows] = await sequelize.query(
      `SELECT muted_until FROM muted_conversations WHERE user_id = :recipientId AND conversation_id = :conversationId LIMIT 1`,
      { replacements: { recipientId, conversationId } }
    );
    if (mutedRows && mutedRows[0]) {
      const mu = mutedRows[0].muted_until;
      if (!mu || new Date(mu) > new Date()) {
        return res.json({ success: true, message: 'Conversation is muted', sent: 0 });
      }
    }

    // Preferences
    let prefs = null;
    let userLanguage = 'en';
    let shouldSend = true;
    try {
      const [prefRows] = await sequelize.query(
        `SELECT message_notifications, push_enabled, language, quiet_hours_enabled, quiet_hours_start, quiet_hours_end, quiet_hours_days
         FROM user_preferences WHERE user_id = :recipientId LIMIT 1`,
        { replacements: { recipientId } }
      );
      prefs = prefRows && prefRows[0] ? prefRows[0] : null;
      if (prefs) {
        userLanguage = prefs.language || 'en';
        if (prefs.push_enabled === false || prefs.message_notifications === false) shouldSend = false;
        if (shouldSend && isInQuietHours(prefs)) shouldSend = false;
      }
    } catch (_) {}

    // Store notification record
    const preview = (() => {
      if (String(messageContent).startsWith('[IMAGE:')) return userLanguage === 'ar' ? 'صورة' : 'Photo';
      if (String(messageContent).startsWith('[VOICE:')) return userLanguage === 'ar' ? 'رسالة صوتية' : 'Voice message';
      const t = String(messageContent);
      return t.length > 100 ? t.slice(0, 100) + '...' : t;
    })();

    const notifTitle = senderName || (userLanguage === 'ar' ? 'رسالة جديدة' : 'New Message');
    await sequelize.query(
      `INSERT INTO notifications (user_id, type, title, message, data, is_read)
       VALUES (:recipientId, 'new_message', :title, :message, :data::jsonb, false)`,
      {
        replacements: {
          recipientId,
          title: notifTitle,
          message: preview,
          data: JSON.stringify({ conversationId, senderId, senderName, url: `/chat/${conversationId}` }),
        },
      }
    );

    if (!shouldSend) {
      return res.json({ success: true, message: 'Notifications disabled or in quiet hours', sent: 0 });
    }

    // Tokens
    const [tokenRows] = await sequelize.query(
      `SELECT token FROM push_tokens WHERE user_id = :recipientId AND is_active = true`,
      { replacements: { recipientId } }
    );
    if (!tokenRows || tokenRows.length === 0) {
      return res.json({ success: true, message: 'No push tokens found', sent: 0 });
    }

    // Badge count (unread messages)
    let badgeCount = 1;
    try {
      const [unreadRows] = await sequelize.query(
        `SELECT COUNT(*)::int AS c FROM messages WHERE receiver_id = :recipientId AND is_read = false`,
        { replacements: { recipientId } }
      );
      badgeCount = (unreadRows && unreadRows[0] && unreadRows[0].c) ? unreadRows[0].c : 1;
    } catch (_) {}

    const body = vehicleTitle ? `${preview}\n${vehicleTitle}` : preview;

    const messages = tokenRows.map((r) => ({
      to: r.token,
      sound: 'default',
      title: notifTitle,
      body,
      data: {
        type: 'new_message',
        conversationId,
        senderId,
        senderName,
        vehicleTitle,
        timestamp: new Date().toISOString(),
      },
      channelId: 'messages',
      priority: 'high',
      badge: badgeCount,
    }));

    const expoRes = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages),
    });

    if (!expoRes.ok) {
      const txt = await expoRes.text();
      return res.json({ success: true, message: 'Expo push failed', details: txt, sent: 0 });
    }

    const expoJson = await expoRes.json();
    const results = expoJson.data || [];
    const okCount = results.filter((r) => r.status === 'ok').length;

    return res.json({ success: true, sent: okCount });
  } catch (error) {
    console.error('send-message-notification error:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

module.exports = router;
