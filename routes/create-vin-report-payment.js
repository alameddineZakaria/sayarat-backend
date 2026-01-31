const express = require('express');
const fetch = require('node-fetch');
const sequelize = require('../config/db');

/**
 * @swagger
 * /api/create-vin-report-payment:
 *   post:
 *     summary: Create a payment intent for purchasing a VIN report
 *     tags:
 *       - Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vin:
 *                 type: string
 *                 example: 1HGCM82633A004352
 *               reportType:
 *                 type: string
 *                 example: carfax
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               userId:
 *                 type: integer
 *                 example: 45
 *               listingId:
 *                 type: integer
 *                 nullable: true
 *               vehicleId:
 *                 type: integer
 *                 nullable: true
 *             required: [vin, reportType, email]
 *     responses:
 *       200:
 *         description: Payment intent created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server configuration error
 */

const router = express.Router();

const REPORT_PRICES = {
  basic: {
    priceId: 'price_1Sp5XuQm9R71HIbVxTRcHrDa',
    amount: 499,
    name: 'VIN Report - Basic Decode',
  },
  full: {
    priceId: 'price_1Sp5XuQm9R71HIbVa9QcExwV',
    amount: 999,
    name: 'VIN Report - Full History',
  },
};

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
    const { vin, reportType, email, userId, listingId, vehicleId } = req.body || {};
    const cleanVin = String(vin || '').trim().toUpperCase();

    if (!cleanVin || cleanVin.length !== 17) {
      return res.status(400).json({ error: 'Invalid VIN - must be 17 characters' });
    }

    if (!reportType || !REPORT_PRICES[reportType]) {
      return res.status(400).json({ error: 'Invalid report type - must be "basic" or "full"' });
    }

    if (!email) {
      return res.status(400).json({ error: 'Email is required for receipt' });
    }

    const gatewayApiKey = process.env.GATEWAY_API_KEY;
    if (!gatewayApiKey) {
      return res.status(500).json({ error: 'Payment gateway not configured' });
    }

    const priceInfo = REPORT_PRICES[reportType];

    // Create PaymentIntent through the Payment Gateway
    const response = await fetch('https://stripe.gateway.fastrouter.io/payments/payment-intents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': gatewayApiKey,
      },
      body: JSON.stringify({
        amount: priceInfo.amount,
        currency: 'usd',
        metadata: {
          vin: cleanVin,
          report_type: reportType,
          email,
          user_id: userId || 'guest',
          product_name: priceInfo.name,
          listing_id: listingId || undefined,
          vehicle_id: vehicleId || undefined,
        },
        description: `${priceInfo.name} for VIN: ${cleanVin}`,
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return res.status(500).json({ error: data.error || 'Failed to create payment intent' });
    }

    // Create a pending purchase record in the database (best effort)
    try {
      await sequelize.query(
        `INSERT INTO vin_report_purchases
          (user_id, vin, vehicle_id, listing_id, report_type, amount, status, payment_id, created_at)
         VALUES (:user_id, :vin, :vehicle_id, :listing_id, :report_type, :amount, 'pending', :payment_id, NOW())`,
        {
          replacements: {
            user_id: userId || null,
            vin: cleanVin,
            vehicle_id: vehicleId || null,
            listing_id: listingId || null,
            report_type: reportType,
            amount: priceInfo.amount / 100,
            payment_id: data.id,
          },
        }
      );
    } catch (e) {
      // Don't fail the payment intent if DB insert fails
      console.warn('vin_report_purchases insert failed:', e.message || e);
    }

    return res.json({
      clientSecret: data.clientSecret,
      paymentIntentId: data.id,
      amount: priceInfo.amount,
      reportType,
      vin: cleanVin,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

module.exports = router;
