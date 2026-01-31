const express = require('express');
const fetch = require('node-fetch');

/**
 * @swagger
 * /api/send-sms-notification:
 *   post:
 *     summary: Send an SMS notification
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: +96170123456
 *               message:
 *                 type: string
 *                 example: Your verification code is 1234
 *               action:
 *                 type: string
 *                 nullable: true
 *                 example: otp
 *             required: [phone, message]
 *     responses:
 *       200:
 *         description: Sent
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

const router = express.Router();

function basicAuthHeader(user, pass) {
  const token = Buffer.from(`${user}:${pass}`).toString('base64');
  return `Basic ${token}`;
}

router.post('/', async (req, res) => {
  try {
    const { phone, message, action } = req.body || {};

    const twilioAccountSid = (process.env.TWILIO_ACCOUNT_SID || '').trim();
    const twilioAuthToken = (process.env.TWILIO_AUTH_TOKEN || '').trim();
    const twilioPhoneNumber = (process.env.TWILIO_PHONE_NUMBER || '').trim();

    // Diagnostic: return a quick credential sanity report
    if (action === 'diagnose') {
      return res.json({
        success: true,
        diagnostics: {
          account_sid: {
            exists: !!twilioAccountSid,
            length: twilioAccountSid.length,
            starts_with_ac: twilioAccountSid.toUpperCase().startsWith('AC'),
          },
          auth_token: {
            exists: !!twilioAuthToken,
            length: twilioAuthToken.length,
          },
          phone_number: {
            exists: !!twilioPhoneNumber,
            value: twilioPhoneNumber,
            starts_with_plus: twilioPhoneNumber.startsWith('+'),
          },
        },
      });
    }

    if (action === 'test_network') {
      const start = Date.now();
      try {
        const r = await fetch('https://api.twilio.com', { method: 'GET' });
        return res.json({ success: true, status: r.status, elapsed_ms: Date.now() - start });
      } catch (e) {
        return res.status(500).json({ success: false, error: e.message, elapsed_ms: Date.now() - start });
      }
    }

    if (action === 'test_credentials') {
      if (!twilioAccountSid || !twilioAuthToken) {
        return res.status(400).json({ success: false, error: 'Missing Twilio credentials' });
      }
      const start = Date.now();
      const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}.json`, {
        method: 'GET',
        headers: { Authorization: basicAuthHeader(twilioAccountSid, twilioAuthToken), Accept: 'application/json' },
      });
      const text = await r.text();
      return res.json({ success: r.ok, status: r.status, elapsed_ms: Date.now() - start, response_preview: text.slice(0, 200) });
    }

    // Actual send
    if (!phone || !message) {
      return res.status(400).json({ error: 'phone and message are required' });
    }
    if (!twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber) {
      return res.json({ success: true, message: 'Twilio not configured; SMS not sent', logged: { phone, message } });
    }

    const form = new URLSearchParams();
    form.set('From', twilioPhoneNumber);
    form.set('To', phone);
    form.set('Body', message);

    const url = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
    const twilioRes = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: basicAuthHeader(twilioAccountSid, twilioAuthToken),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form.toString(),
    });

    const resultText = await twilioRes.text();
    let result;
    try {
      result = JSON.parse(resultText);
    } catch {
      result = { raw: resultText };
    }

    if (!twilioRes.ok) {
      return res.status(500).json({ success: false, error: result.message || 'Failed to send SMS', details: result });
    }

    return res.json({ success: true, sid: result.sid, status: result.status });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

module.exports = router;
