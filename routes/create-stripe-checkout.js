const express = require('express');
const fetch = require('node-fetch');
const sequelize = require('../config/db');

/**
 * @swagger
 * /api/create-stripe-checkout:
 *   post:
 *     summary: Create a Stripe checkout session or manage subscription actions
 *     tags:
 *       - Stripe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 description: Optional action (cancel_subscription, pause_subscription, resume_subscription, create_portal_session)
 *               product_id:
 *                 type: string
 *                 description: Product key for checkout session
 *                 example: com.sayarat.subscription.pro.monthly
 *               listing_id:
 *                 type: integer
 *                 nullable: true
 *               vin:
 *                 type: string
 *                 nullable: true
 *               success_url:
 *                 type: string
 *                 example: https://sayarat.com/success
 *               cancel_url:
 *                 type: string
 *                 example: https://sayarat.com/cancel
 *               subscription_id:
 *                 type: string
 *                 nullable: true
 *               pause_duration:
 *                 type: integer
 *                 nullable: true
 *               return_url:
 *                 type: string
 *                 nullable: true
 *               userId:
 *                 type: integer
 *                 nullable: true
 *               email:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Checkout session or action result
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

const router = express.Router();

// Product configurations (amounts in cents)
const PRODUCTS = {
  'com.sayarat.subscription.basic.monthly': {
    name: 'Dealer Basic - Monthly',
    price: 2999,
    mode: 'subscription',
    recurring: { interval: 'month' },
  },
  'com.sayarat.subscription.pro.monthly': {
    name: 'Dealer Pro - Monthly',
    price: 7999,
    mode: 'subscription',
    recurring: { interval: 'month' },
  },
  'com.sayarat.subscription.premium.monthly': {
    name: 'Dealer Premium - Monthly',
    price: 14999,
    mode: 'subscription',
    recurring: { interval: 'month' },
  },
  'com.sayarat.vehicle_history_report': {
    name: 'Vehicle History Report',
    price: 1000,
    mode: 'payment',
  },
  'com.sayarat.boost.1day': {
    name: '1-Day Listing Boost',
    price: 500,
    mode: 'payment',
  },
  'com.sayarat.boost.3days': {
    name: '3-Day Listing Boost',
    price: 1200,
    mode: 'payment',
  },
  'com.sayarat.boost.7days': {
    name: '7-Day Listing Boost',
    price: 2500,
    mode: 'payment',
  },
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

router.options('/', (req, res) => {
  res.set(corsHeaders);
  return res.status(200).send('ok');
});

function formEncode(obj) {
  return new URLSearchParams(obj).toString();
}

async function stripePost(path, params) {
  const stripeKey = process.env.STRIPE_SECRET_KEY || process.env.GATEWAY_API_KEY;
  if (!stripeKey) throw new Error('Stripe API key not configured (STRIPE_SECRET_KEY or GATEWAY_API_KEY)');

  const resp = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${stripeKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formEncode(params),
  });

  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    const msg = data?.error?.message || data?.message || 'Stripe request failed';
    throw new Error(msg);
  }
  return data;
}

/**
 * POST /api/create-stripe-checkout
 *
 * This is the Node.js equivalent of the Supabase Edge Function.
 * Since Supabase Auth isn't available here, we accept userId/email in the body.
 *
 * Body:
 *  - action: optional (cancel_subscription | create_portal_session | pause_subscription | resume_subscription)
 *  - product_id (required for checkout session)
 *  - userId (recommended)
 *  - email (recommended)
 *  - listing_id, vin
 *  - success_url, cancel_url
 */
router.post('/', async (req, res) => {
  try {
    const {
      action,
      product_id,
      listing_id,
      vin,
      success_url,
      cancel_url,
      subscription_id,
      pause_duration,
      return_url,
      userId,
      email,
    } = req.body || {};

    // Action: cancel subscription
    if (action === 'cancel_subscription') {
      if (!subscription_id) return res.status(400).json({ error: 'subscription_id is required' });
      const cancelled = await stripePost(`subscriptions/${subscription_id}`, { cancel_at_period_end: 'true' });
      return res.json({ success: true, subscription: cancelled });
    }

    // Action: pause subscription
    if (action === 'pause_subscription') {
      if (!subscription_id) return res.status(400).json({ error: 'subscription_id is required' });
      const pauseDays = Number(pause_duration || 30);
      const resumeAt = Math.floor(Date.now() / 1000) + pauseDays * 86400;
      const paused = await stripePost(`subscriptions/${subscription_id}`, {
        'pause_collection[behavior]': 'mark_uncollectible',
        'pause_collection[resumes_at]': String(resumeAt),
      });
      return res.json({ success: true, subscription: paused });
    }

    // Action: resume subscription
    if (action === 'resume_subscription') {
      if (!subscription_id) return res.status(400).json({ error: 'subscription_id is required' });
      const resumed = await stripePost(`subscriptions/${subscription_id}`, {
        'pause_collection[behavior]': '',
      });
      return res.json({ success: true, subscription: resumed });
    }

    // Action: create customer portal session
    if (action === 'create_portal_session') {
      if (!userId) return res.status(400).json({ error: 'userId is required' });
      const [[sub]] = await sequelize.query(
        `SELECT stripe_customer_id FROM subscriptions WHERE user_id = :user_id ORDER BY updated_at DESC NULLS LAST LIMIT 1`,
        { replacements: { user_id: userId } }
      );
      if (!sub?.stripe_customer_id) return res.status(400).json({ error: 'No stripe_customer_id found for user' });
      const portal = await stripePost('billing_portal/sessions', {
        customer: sub.stripe_customer_id,
        return_url: return_url || success_url || cancel_url || 'https://sayarat.com',
      });
      return res.json({ success: true, url: portal.url, id: portal.id });
    }

    // Default: create checkout session
    if (!product_id) return res.status(400).json({ error: 'product_id is required' });

    const product = PRODUCTS[product_id];
    if (!product) return res.status(400).json({ error: 'Invalid product_id' });

    // Get / create customer in Stripe
    let customerId = null;
    if (userId) {
      const [[sub]] = await sequelize.query(
        `SELECT stripe_customer_id FROM subscriptions WHERE user_id = :user_id ORDER BY updated_at DESC NULLS LAST LIMIT 1`,
        { replacements: { user_id: userId } }
      );
      if (sub?.stripe_customer_id) customerId = sub.stripe_customer_id;
    }

    if (!customerId && email) {
      const customer = await stripePost('customers', {
        email,
        ...(userId ? { 'metadata[user_id]': userId } : {}),
      });
      customerId = customer?.id || null;

      // Persist for later reuse
      if (userId && customerId) {
        await sequelize.query(
          `UPDATE subscriptions SET stripe_customer_id = :cid, updated_at = NOW() WHERE user_id = :user_id`,
          { replacements: { cid: customerId, user_id: userId } }
        ).catch(() => {});
      }
    }

    const params = {
      mode: product.mode,
      success_url: success_url || `https://sayarat.com/purchase-success?session_id={CHECKOUT_SESSION_ID}&product=${encodeURIComponent(product_id)}`,
      cancel_url: cancel_url || `https://sayarat.com/purchase-cancelled`,
      'line_items[0][price_data][currency]': 'usd',
      'line_items[0][price_data][product_data][name]': product.name,
      'line_items[0][price_data][unit_amount]': String(product.price),
      'line_items[0][quantity]': '1',
      ...(product.mode === 'subscription' && product.recurring
        ? { 'line_items[0][price_data][recurring][interval]': product.recurring.interval }
        : {}),
      ...(customerId ? { customer: customerId } : email ? { customer_email: email } : {}),
      ...(userId ? { 'metadata[user_id]': userId } : {}),
      'metadata[product_id]': product_id,
      ...(listing_id ? { 'metadata[listing_id]': String(listing_id) } : {}),
      ...(vin ? { 'metadata[vin]': String(vin).toUpperCase() } : {}),
    };

    const session = await stripePost('checkout/sessions', params);
    return res.json({ success: true, sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('create-stripe-checkout error:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

module.exports = router;
