// routes/sent-otp-sms.js
const express = require('express');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const sequelize = require('../config/db');

/**
 * @swagger
 * /api/send-otp-sms:
 *   post:
 *     summary: Send OTP via SMS or WhatsApp
 *     tags:
 *       - OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "+966501234567"
 *               language:
 *                 type: string
 *                 enum:
 *                   - en
 *                   - ar
 *                 default: en
 *               channel:
 *                 type: string
 *                 enum:
 *                   - sms
 *                   - whatsapp
 *                 default: sms
 *               purpose:
 *                 type: string
 *                 example: verification
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 sid:
 *                   type: string
 *                 message:
 *                   type: string
 *                 _status:
 *                   type: number
 */

function jsonResponse(res, data, status = 200) {
  return res.status(200).json({ ...data, _status: status });
}

// POST /send-otp-sms
router.post('/send-otp-sms', async (req, res) => {
  try {
    const { phone, language = 'en', channel = 'sms', purpose = 'verification' } = req.body;
    if (!phone) return jsonResponse(res, { success: false, error: 'Phone number is required' });

    const cleanPhone = phone.replace(/[\s-]/g, '');
    const otpCode = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    await sequelize.query(
      `DELETE FROM phone_otps WHERE phone_number = :phone AND purpose = :purpose AND verified = false`,
      { replacements: { phone: cleanPhone, purpose } }
    );

    await sequelize.query(
      `INSERT INTO phone_otps
        (id, phone_number, otp_code, purpose, attempts, max_attempts, is_used, expires_at, created_at, verified)
       VALUES (:id, :phone, :otp, :purpose, 0, 3, false, :expires, NOW(), false)`,
      {
        replacements: {
          id: uuidv4(),
          phone: cleanPhone,
          otp: otpCode,
          purpose,
          expires: expiresAt,
        },
      }
    );

    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_PHONE_NUMBER;

    const msg = language === 'ar' ? `سيارات - رمز التحقق: ${otpCode}` : `Sayarat - Your verification code is: ${otpCode}`;
    const toNumber = channel === 'whatsapp' ? `whatsapp:${cleanPhone}` : cleanPhone;
    const fromNumber = channel === 'whatsapp' ? `whatsapp:${from}` : from;
    const authString = Buffer.from(`${sid}:${token}`).toString('base64');

    const twilioRes = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: `To=${encodeURIComponent(toNumber)}&From=${encodeURIComponent(fromNumber)}&Body=${encodeURIComponent(msg)}`,
    });

    const twilioData = await twilioRes.json();
    if (!twilioRes.ok) return jsonResponse(res, { success: false, error: twilioData.message });

    return jsonResponse(res, { success: true, sid: twilioData.sid, message: 'OTP sent' });
  } catch (err) {
    console.error(err);
    return jsonResponse(res, { success: false, error: err.message });
  }
});


/**
 * @swagger
 * /verify-otp-sms:
 *   post:
 *     summary: Verify OTP code
 *     tags:
 *       - OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - otp
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "+966501234567"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               purpose:
 *                 type: string
 *                 example: verification
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 verified:
 *                   type: boolean
 *                 _status:
 *                   type: number
 */

// POST /verify-otp-sms
router.post('/verify-otp-sms', async (req, res) => {
  try {
    const { phone, otp, purpose = 'verification' } = req.body;
    console.log(phone, otp);
    if (!phone || !otp) return jsonResponse(res, { success: false, error: 'Phone and OTP required' });

    const cleanPhone = phone.replace(/[\s-]/g, '');

    const [results] = await sequelize.query(
      `SELECT * FROM phone_otps 
       WHERE phone_number = :phone AND purpose = :purpose AND verified = false
       ORDER BY created_at DESC
       LIMIT 1`,
      { replacements: { phone: cleanPhone, purpose } }
    );

    const record = results[0];
    if (!record) return jsonResponse(res, { success: false, error: 'No OTP found' });

    if (new Date(record.expires_at) < new Date()) return jsonResponse(res, { success: false, error: 'OTP expired' });

    if (record.attempts >= record.max_attempts) return jsonResponse(res, { success: false, error: 'Too many attempts' });

    if (String(record.otp_code) !== String(otp)) {
      await sequelize.query(
        `UPDATE phone_otps SET attempts = attempts + 1 WHERE id = :id`,
        { replacements: { id: record.id } }
      );
      return jsonResponse(res, { success: false, error: 'Invalid OTP' });
    }

    await sequelize.query(
      `UPDATE phone_otps SET verified = true, verified_at = NOW(), is_used = true WHERE id = :id`,
      { replacements: { id: record.id } }
    );

    return jsonResponse(res, { success: true, verified: true });
  } catch (err) {
    console.error(err);
    return jsonResponse(res, { success: false, error: err.message });
  }
});

module.exports = router;
