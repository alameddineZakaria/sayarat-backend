const express = require('express');
const fetch = require('node-fetch');

/**
 * @swagger
 * /api/create-boost-payment:
 *   post:
 *     summary: Create a payment intent for boosting a vehicle listing
 *     tags:
 *       - Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boostType:
 *                 type: string
 *                 description: Boost duration key
 *                 example: 1_week
 *               vehicleId:
 *                 type: integer
 *                 example: 123
 *               userId:
 *                 type: integer
 *                 example: 45
 *               vehicleTitle:
 *                 type: string
 *                 example: Toyota Corolla 2018
 *             required: [boostType, vehicleId, userId]
 *     responses:
 *       200:
 *         description: Payment intent created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server configuration error
 */

const router = express.Router();

const BOOST_PRICES = {
  '1_day': { amount: 500, priceId: 'price_1Slkv2Qm9R71HIbV1nHKVSdT' },
  '3_days': { amount: 1200, priceId: 'price_1Slkv2Qm9R71HIbVUs68HdkE' },
  '1_week': { amount: 2500, priceId: 'price_1Slkv2Qm9R71HIbVfMTksdYL' },
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

router.options('/', (req, res) => res.set(corsHeaders).status(200).send('ok'));

router.post('/', async (req, res) => {
  try {
    const { boostType, vehicleId, userId, vehicleTitle } = req.body || {};

    if (!boostType || !vehicleId || !userId) {
      return res.status(400).json({ error: 'Missing required fields: boostType, vehicleId, userId' });
    }

    const boostConfig = BOOST_PRICES[boostType];
    if (!boostConfig) {
      return res.status(400).json({ error: 'Invalid boost type' });
    }

    const gatewayApiKey = process.env.GATEWAY_API_KEY;
    if (!gatewayApiKey) {
      return res.status(500).json({ error: 'Gateway API key not configured' });
    }

    const response = await fetch('https://stripe.gateway.fastrouter.io/payments/payment-intents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': gatewayApiKey,
      },
      body: JSON.stringify({
        amount: boostConfig.amount,
        currency: 'usd',
        metadata: {
          boost_type: boostType,
          vehicle_id: vehicleId,
          user_id: userId,
          vehicle_title: vehicleTitle || 'Vehicle Boost',
          type: 'listing_boost',
        },
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return res.status(502).json({ error: data.error || 'Failed to create payment intent' });
    }

    return res.json({
      clientSecret: data.clientSecret,
      paymentIntentId: data.id,
      amount: boostConfig.amount,
      boostType,
    });
  } catch (error) {
    console.error('create-boost-payment error:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

module.exports = router;
