const express = require('express');
const fetch = require('node-fetch');
const sequelize = require('../config/db');

/**
 * @swagger
 * /api/send-offer-notification:
 *   post:
 *     summary: Send offer notification to a user
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               offerId:
 *                 type: integer
 *                 example: 555
 *               type:
 *                 type: string
 *                 example: offer
 *               recipientId:
 *                 type: integer
 *                 example: 10
 *               title:
 *                 type: string
 *                 example: New offer received
 *               body:
 *                 type: string
 *                 example: You received a new offer on your listing
 *               amount:
 *                 type: number
 *                 nullable: true
 *                 example: 10000
 *               vehicleTitle:
 *                 type: string
 *                 nullable: true
 *             required: [offerId, recipientId, title, body]
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
  const start = (prefs.quiet_hours_start || '22:00:00').split(':');
  const end = (prefs.quiet_hours_end || '08:00:00').split(':');
  const startHour = parseInt(start[0], 10);
  const endHour = parseInt(end[0], 10);
  const h = now.getHours();
  if (startHour > endHour) return h >= startHour || h < endHour;
  return h >= startHour && h < endHour;
}

router.post('/', async (req, res) => {
  try {
    const { offerId, type, recipientId, title, body, amount, vehicleTitle } = req.body || {};
    if (!offerId || !type || !recipientId || !title || !body) {
      return res.status(400).json({ error: 'Missing required fields: offerId, type, recipientId, title, body' });
    }

    // Preferences
    let prefs = {};
    try {
      const [rows] = await sequelize.query(
        `SELECT language, push_enabled, offer_notifications, quiet_hours_enabled, quiet_hours_start, quiet_hours_end, quiet_hours_days
         FROM user_preferences WHERE user_id = :userId LIMIT 1`,
        { replacements: { userId: recipientId } }
      );
      if (rows && rows[0]) prefs = rows[0];
    } catch (_) {}

    const pushEnabled = prefs.push_enabled !== false;
    const offerNotifEnabled = prefs.offer_notifications !== false;
    const inQuiet = isInQuietHours(prefs);

    // Store offer notification record (best-effort)
    try {
      await sequelize.query(
        `INSERT INTO offer_notifications (user_id, offer_id, type, title, body, amount, is_read, created_at)
         VALUES (:user_id, :offer_id, :type, :title, :body, :amount, false, NOW())`,
        { replacements: { user_id: recipientId, offer_id: offerId, type, title, body, amount: amount ?? null } }
      );
    } catch (_) {}

    // Also store general notification
    try {
      await sequelize.query(
        `INSERT INTO notifications (user_id, type, title, message, data, is_read, created_at)
         VALUES (:user_id, :type, :title, :message, :data::jsonb, false, NOW())`,
        {
          replacements: {
            user_id: recipientId,
            type: type === 'new_offer' ? 'offer_received' : type,
            title,
            message: body,
            data: JSON.stringify({ offerId, amount, vehicleTitle }),
          },
        }
      );
    } catch (_) {}

    if (!pushEnabled || !offerNotifEnabled || inQuiet) {
      return res.json({ success: true, message: 'Push disabled or quiet hours', sent: 0 });
    }

    const [tokens] = await sequelize.query(
      `SELECT token FROM push_tokens WHERE user_id = :userId AND is_active = true`,
      { replacements: { userId: recipientId } }
    );

    if (!tokens || tokens.length === 0) {
      return res.json({ success: true, message: 'No push tokens found', sent: 0 });
    }

    const channelId = type.includes('offer') ? 'offers' : 'default';

    const messages = tokens.map((t) => ({
      to: t.token,
      sound: 'default',
      title,
      body,
      data: { type, offerId, amount, vehicleTitle, timestamp: new Date().toISOString() },
      channelId,
      priority: type === 'new_offer' || type === 'counter_offer' ? 'high' : 'default',
    }));

    const expoResp = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages),
    });

    if (!expoResp.ok) {
      const t = await expoResp.text();
      return res.status(502).json({ error: `Expo push failed: ${t}` });
    }

    const expoResult = await expoResp.json();
    const results = expoResult.data || [];
    const successCount = results.filter((r) => r.status === 'ok').length;
    const errorCount = results.filter((r) => r.status === 'error').length;

    // Mark invalid tokens inactive
    const invalid = results
      .map((r, i) => ({ r, i }))
      .filter(({ r }) => r.status === 'error' && r.details && r.details.error === 'DeviceNotRegistered')
      .map(({ i }) => tokens[i] && tokens[i].token)
      .filter(Boolean);

    for (const token of invalid) {
      try {
        await sequelize.query(`UPDATE push_tokens SET is_active = false WHERE token = :token`, { replacements: { token } });
      } catch (_) {}
    }

    return res.json({ success: true, sent: successCount, errors: errorCount, invalidTokensRemoved: invalid.length });
  } catch (error) {
    console.error('send-offer-notification error:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

module.exports = router;
