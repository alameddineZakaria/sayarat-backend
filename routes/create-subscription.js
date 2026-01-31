const express = require('express');
const fetch = require('node-fetch');

/**
 * @swagger
 * /api/create-subscription:
 *   post:
 *     summary: Create or manage a subscription (create/cancel/pause/resume)
 *     tags:
 *       - Subscriptions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: dealer@example.com
 *               name:
 *                 type: string
 *                 example: Dealer Name
 *               action:
 *                 type: string
 *                 description: Subscription action
 *                 example: create
 *               customerId:
 *                 type: string
 *                 description: Existing Stripe customer id (optional)
 *                 example: cus_123
 *               tier:
 *                 type: string
 *                 description: Subscription tier
 *                 example: pro
 *     responses:
 *       200:
 *         description: Subscription action completed
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

const router = express.Router();

const SUBSCRIPTION_PRICES = {
  basic: 'price_1SlnVGQm9R71HIbVsYTOoNFj',
  pro: 'price_1SlnVGQm9R71HIbV47U0iYv4',
  premium: 'price_1SlnVGQm9R71HIbVXllHONm5',
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
    const gatewayApiKey = process.env.GATEWAY_API_KEY;
    if (!gatewayApiKey) return res.status(500).json({ error: 'Gateway API key not configured' });

    const { email, name, action, customerId: existingCustomerId, tier } = req.body || {};

    // STEP 1: create customer + setup intent
    if (action === 'create-setup-intent' || !action) {
      if (!email) return res.status(400).json({ error: 'Email is required' });
      if (!tier || !SUBSCRIPTION_PRICES[tier]) return res.status(400).json({ error: 'Invalid subscription tier' });

      // Find existing customer by email
      const customersResponse = await fetch(
        `https://stripe.gateway.fastrouter.io/payments/customers?email=${encodeURIComponent(email)}`,
        { headers: { 'Content-Type': 'application/json', 'X-API-Key': gatewayApiKey } }
      );
      const customersData = await customersResponse.json().catch(() => ({}));

      let customerId;
      if (customersData?.data?.length > 0) {
        customerId = customersData.data[0].id;
      } else {
        const createCustomerResponse = await fetch('https://stripe.gateway.fastrouter.io/payments/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-API-Key': gatewayApiKey },
          body: JSON.stringify({ email, name: name || email.split('@')[0] }),
        });
        const newCustomer = await createCustomerResponse.json().catch(() => ({}));
        if (!createCustomerResponse.ok) return res.status(500).json({ error: newCustomer.error || 'Failed to create customer' });
        customerId = newCustomer.id;
      }

      const priceId = SUBSCRIPTION_PRICES[tier];
      const setupIntentResponse = await fetch('https://stripe.gateway.fastrouter.io/payments/setup-intents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': gatewayApiKey },
        body: JSON.stringify({
          customer: customerId,
          metadata: { price_id: priceId, tier },
        }),
      });

      const setupIntent = await setupIntentResponse.json().catch(() => ({}));
      if (!setupIntentResponse.ok) return res.status(500).json({ error: setupIntent.error || 'Failed to create setup intent' });

      return res.status(200).json({
        clientSecret: setupIntent.clientSecret,
        customerId,
        setupIntentId: setupIntent.id,
        tier,
      });
    }

    // STEP 2: activate subscription
    if (action === 'activate-subscription') {
      if (!existingCustomerId) return res.status(400).json({ error: 'Customer ID is required' });
      if (!tier || !SUBSCRIPTION_PRICES[tier]) return res.status(400).json({ error: 'Invalid subscription tier' });

      const priceId = SUBSCRIPTION_PRICES[tier];
      const subscriptionResponse = await fetch('https://stripe.gateway.fastrouter.io/payments/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': gatewayApiKey },
        body: JSON.stringify({
          customer: existingCustomerId,
          items: [{ price: priceId }],
          metadata: { tier },
        }),
      });
      const subscription = await subscriptionResponse.json().catch(() => ({}));
      if (!subscriptionResponse.ok) return res.status(500).json({ error: subscription.error || 'Failed to create subscription' });

      return res.status(200).json({ subscriptionId: subscription.id, status: subscription.status, tier });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

module.exports = router;
