const express = require('express');
const fetch = require('node-fetch');

/**
 * @swagger
 * /api/send-email-receipt:
 *   post:
 *     summary: Send a purchase receipt email
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
 *               receiptType:
 *                 type: string
 *                 example: vin_report
 *               data:
 *                 type: object
 *                 description: Receipt payload (varies by type)
 *             required: [email, receiptType, data]
 *     responses:
 *       200:
 *         description: Sent
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, receiptType, data } = req.body || {};

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    const emailFrom = process.env.EMAIL_FROM || 'noreply@automarket.com';

    if (!sendgridApiKey) {
      console.log('SendGrid not configured, logging receipt instead');
      console.log('Receipt:', { email, receiptType, data });
      return res.json({ success: true, message: 'Receipt logged (email not configured)' });
    }

    let subject = 'Payment Confirmation';
    let htmlContent = `<html><body><h1>Payment Confirmed</h1><pre>${escapeHtml(JSON.stringify(data || {}, null, 2))}</pre></body></html>`;

    if (receiptType === 'vin_report') {
      const { vin, reportType, amount, paymentIntentId, purchaseDate } = data || {};
      const formattedAmount = typeof amount === 'number' ? (amount / 100).toFixed(2) : '0.00';
      const reportName = reportType === 'full' ? 'Full History Report' : 'Basic Decode Report';

      subject = `Your VIN Report Purchase Confirmation - ${vin || ''}`;
      htmlContent = buildVinReceipt({ vin, reportName, formattedAmount, paymentIntentId, purchaseDate });
    } else if (receiptType === 'subscription') {
      const { planName, amount, interval, startDate } = data || {};
      const formattedAmount = typeof amount === 'number' ? (amount / 100).toFixed(2) : '0.00';
      subject = `Subscription Confirmation - ${planName || ''}`;
      htmlContent = buildSubscriptionReceipt({ planName, formattedAmount, interval, startDate });
    }

    const sendGridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sendgridApiKey}`,
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email }] }],
        from: { email: emailFrom, name: 'AutoMarket' },
        subject,
        content: [{ type: 'text/html', value: htmlContent }],
      }),
    });

    if (!sendGridResponse.ok) {
      const errorText = await sendGridResponse.text();
      console.error('SendGrid error:', errorText);
      return res.status(502).json({ error: 'Failed to send email', details: errorText });
    }

    return res.json({ success: true, message: 'Receipt email sent successfully' });
  } catch (error) {
    console.error('Error sending receipt:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildVinReceipt({ vin, reportName, formattedAmount, paymentIntentId, purchaseDate }) {
  const date = purchaseDate ? new Date(purchaseDate) : new Date();
  return `<!DOCTYPE html><html><head><meta charset="UTF-8" /></head><body style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:linear-gradient(135deg,#2563eb,#7c3aed);color:#fff;padding:30px;text-align:center;border-radius:10px 10px 0 0;">
      <h1 style="margin:0;">Payment Confirmed</h1>
      <p style="margin:10px 0 0 0;opacity:0.9;">Thank you for your purchase!</p>
    </div>
    <div style="background:#f9fafb;padding:30px;border:1px solid #e5e7eb;">
      <p>Your VIN report purchase has been confirmed. Here are your receipt details:</p>
      <div style="background:#fff;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #e5e7eb;">
        <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f3f4f6;"><span style="color:#6b7280;">VIN Number</span><span style="font-weight:600;">${escapeHtml(vin || '')}</span></div>
        <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f3f4f6;"><span style="color:#6b7280;">Report Type</span><span style="font-weight:600;">${escapeHtml(reportName || '')}</span></div>
        <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f3f4f6;"><span style="color:#6b7280;">Purchase Date</span><span style="font-weight:600;">${date.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</span></div>
        <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f3f4f6;"><span style="color:#6b7280;">Transaction ID</span><span style="font-weight:600;font-size:0.85em;">${escapeHtml(paymentIntentId || '')}</span></div>
        <div style="display:flex;justify-content:space-between;padding:10px 0;"><span style="color:#6b7280;">Amount Paid</span><span style="font-weight:700;color:#2563eb;font-size:1.2em;">$${escapeHtml(formattedAmount)} USD</span></div>
      </div>
      <p>This is an automated receipt for your records.</p>
    </div>
  </div></body></html>`;
}

function buildSubscriptionReceipt({ planName, formattedAmount, interval, startDate }) {
  const date = startDate ? new Date(startDate) : new Date();
  return `<!DOCTYPE html><html><head><meta charset="UTF-8" /></head><body style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;padding:30px;text-align:center;border-radius:10px 10px 0 0;">
      <h1 style="margin:0;">Welcome to ${escapeHtml(planName || 'Your Plan')}!</h1>
      <p style="margin:10px 0 0 0;opacity:0.9;">Your subscription is now active</p>
    </div>
    <div style="background:#f9fafb;padding:30px;border:1px solid #e5e7eb;">
      <div style="background:#fff;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #e5e7eb;">
        <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f3f4f6;"><span>Plan</span><span><strong>${escapeHtml(planName || '')}</strong></span></div>
        <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f3f4f6;"><span>Billing</span><span><strong>$${escapeHtml(formattedAmount)}/${escapeHtml(interval || 'month')}</strong></span></div>
        <div style="display:flex;justify-content:space-between;padding:10px 0;"><span>Start Date</span><span><strong>${date.toLocaleDateString()}</strong></span></div>
      </div>
    </div>
  </div></body></html>`;
}

module.exports = router;
