const express = require('express');
const fetch = require('node-fetch');
const sequelize = require('../config/db');

/**
 * @swagger
 * /api/submit-contact-form:
 *   post:
 *     summary: Submit contact form message
 *     tags:
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Zakaria
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               subject:
 *                 type: string
 *                 example: Support request
 *               message:
 *                 type: string
 *                 example: I need help with my account
 *               language:
 *                 type: string
 *                 nullable: true
 *                 example: en
 *             required: [name, email, subject, message]
 *     responses:
 *       200:
 *         description: Submitted
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

const router = express.Router();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

router.options('/', (req, res) => {
  res.set(corsHeaders).status(200).send('ok');
});

router.post('/', async (req, res) => {
  try {
    const { name = '', email = '', subject = '', message = '', language = 'en' } = req.body || {};

    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .set(corsHeaders)
        .json({ success: false, error: language === 'ar' ? 'جميع الحقول مطلوبة' : 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .set(corsHeaders)
        .json({ success: false, error: language === 'ar' ? 'بريد إلكتروني غير صالح' : 'Invalid email address' });
    }

    // Store in DB
    let messageId = 'unknown';
    try {
      const [rows] = await sequelize.query(
        `INSERT INTO contact_messages (name, email, subject, message, status, created_at)
         VALUES (:name, :email, :subject, :message, 'new', NOW())
         RETURNING id`,
        { replacements: { name, email, subject, message } }
      );
      messageId = rows?.[0]?.id || 'saved';
    } catch (dbErr) {
      console.warn('Failed to store contact message:', dbErr.message);
    }

    // Send emails if configured
    const sendgridApiKey = process.env.SENDGRID_API_KEY || '';
    const emailFrom = process.env.EMAIL_FROM || 'noreply@sayarat.com';

    if (sendgridApiKey) {
      // Support notification
      fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: { Authorization: `Bearer ${sendgridApiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: 'support@sayarat.com' }], subject: `[Sayarat] New contact: ${subject}` }],
          from: { email: emailFrom, name: 'Sayarat' },
          content: [
            {
              type: 'text/html',
              value:
                `<h2>New Contact Message</h2>` +
                `<p><b>From:</b> ${name} (${email})</p>` +
                `<p><b>Subject:</b> ${subject}</p>` +
                `<p><b>Message:</b></p><p>${String(message).replace(/\n/g, '<br/>')}</p>`,
            },
          ],
        }),
      }).catch(() => {});

      // User confirmation
      fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: { Authorization: `Bearer ${sendgridApiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email }],
              subject: language === 'ar' ? 'شكراً لتواصلك - سيارات' : 'Thank you for contacting Sayarat',
            },
          ],
          from: { email: emailFrom, name: 'Sayarat' },
          content: [
            {
              type: 'text/html',
              value:
                language === 'ar'
                  ? `<h2>شكراً ${name}</h2><p>استلمنا رسالتك وسنرد قريباً.</p>`
                  : `<h2>Thank you ${name}</h2><p>We received your message and will respond soon.</p>`,
            },
          ],
        }),
      }).catch(() => {});
    }

    return res
      .status(200)
      .set(corsHeaders)
      .json({
        success: true,
        message: language === 'ar' ? 'تم إرسال رسالتك بنجاح' : 'Message sent successfully',
        id: messageId,
      });
  } catch (error) {
    console.error('submit-contact-form error:', error);
    return res.status(500).set(corsHeaders).json({ success: false, error: 'An error occurred' });
  }
});

module.exports = router;
