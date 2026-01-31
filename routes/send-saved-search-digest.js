const express = require('express');
const sequelize = require('../config/db');
const fetch = require('node-fetch');

/**
 * @swagger
 * /api/send-saved-search-digest:
 *   post:
 *     summary: Send saved-search digest email to a user
 *     tags:
 *       - Email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 45
 *             required: [user_id]
 *     responses:
 *       200:
 *         description: Sent
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

const router = express.Router();

async function sendSendGridEmail({ to, subject, html }) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.EMAIL_FROM || 'noreply@automarket.com';
  if (!apiKey) {
    console.log('SENDGRID not configured; digest logged only', { to, subject });
    return { ok: true, logged: true };
  }
  const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from, name: 'AutoMarket' },
      subject,
      content: [{ type: 'text/html', value: html }],
    }),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`SendGrid error: ${t}`);
  }
  return { ok: true };
}

router.post('/', async (req, res) => {
  try {
    const { user_id } = req.body || {};

    // Get users who have pending new matches
    const [rows] = await sequelize.query(
      `SELECT ss.user_id, p.email, COUNT(*)::int AS searches_with_new
       FROM saved_searches ss
       LEFT JOIN profiles p ON p.id::text = ss.user_id::text
       WHERE ss.new_matches_since_view > 0
         ${user_id ? 'AND ss.user_id::text = :user_id::text' : ''}
       GROUP BY ss.user_id, p.email`,
      { replacements: user_id ? { user_id } : {} }
    );

    if (!rows || rows.length === 0) {
      return res.json({ success: true, message: 'No digests to send', sent: 0 });
    }

    let sent = 0;
    for (const u of rows) {
      if (!u.email) continue;
      const [searches] = await sequelize.query(
        `SELECT id, name, current_match_count, new_matches_since_view
         FROM saved_searches
         WHERE user_id::text = :uid::text AND new_matches_since_view > 0
         ORDER BY new_matches_since_view DESC`,
        { replacements: { uid: u.user_id } }
      );

      const items = (searches || [])
        .map(s => `<li><b>${s.name || 'Saved search'}</b>: ${s.new_matches_since_view} new match(es)</li>`)
        .join('');

      const html = `
        <div style="font-family:Arial,sans-serif;line-height:1.5">
          <h2>New matches for your saved searches</h2>
          <p>You have new vehicle matches since your last view:</p>
          <ul>${items}</ul>
        </div>
      `;

      await sendSendGridEmail({
        to: u.email,
        subject: 'Saved Search Digest',
        html,
      });

      // Reset counters after sending
      await sequelize.query(
        `UPDATE saved_searches
         SET new_matches_since_view = 0, updated_at = NOW()
         WHERE user_id::text = :uid::text`,
        { replacements: { uid: u.user_id } }
      );

      sent += 1;
    }

    return res.json({ success: true, sent });
  } catch (error) {
    console.error('send-saved-search-digest error:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

module.exports = router;
