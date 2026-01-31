const express = require('express');
const fetch = require('node-fetch');
const sequelize = require('../config/db');

/**
 * @swagger
 * /api/send-email-digest:
 *   post:
 *     summary: Send an email (digest/custom html)
 *     tags:
 *       - Email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               user_id:
 *                 type: integer
 *                 nullable: true
 *                 example: 45
 *               subject:
 *                 type: string
 *                 example: Your weekly digest
 *               html:
 *                 type: string
 *                 description: HTML content
 *             required: [email, subject, html]
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
    console.log('SENDGRID_API_KEY not configured. Email would have been sent to:', to);
    return { logged: true };
  }

  const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from, name: 'AutoMarket' },
      subject,
      content: [{ type: 'text/html', value: html }],
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`SendGrid error: ${err}`);
  }

  return { sent: true };
}

router.post('/', async (req, res) => {
  try {
    // Flexible payload: either provide email directly, or provide user_id
    const { email, user_id, subject, html } = req.body || {};

    const finalSubject = subject || 'Your Digest';
    const finalHtml = html || '<p>No content</p>';

    let to = email;
    if (!to && user_id) {
      const [rows] = await sequelize.query(
        `SELECT email FROM profiles WHERE id = :user_id LIMIT 1`,
        { replacements: { user_id } }
      );
      to = rows && rows[0] && rows[0].email;
    }

    if (!to) {
      return res.status(400).json({ error: 'email or user_id is required' });
    }

    await sendSendGridEmail({ to, subject: finalSubject, html: finalHtml });

    return res.json({ success: true });
  } catch (error) {
    console.error('send-email-digest error:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

module.exports = router;
