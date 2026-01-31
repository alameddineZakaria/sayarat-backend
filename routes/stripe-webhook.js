const express = require('express');
const sequelize = require('../config/db');

/**
 * @swagger
 * /api/stripe-webhook:
 *   post:
 *     summary: Stripe webhook receiver (events handler)
 *     tags:
 *       - Stripe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Stripe event payload
 *     responses:
 *       200:
 *         description: Webhook received
 *       400:
 *         description: Invalid payload
 *       500:
 *         description: Server error
 */

const router = express.Router();

// NOTE: Signature verification is not implemented here.
// If you need Stripe signature verification, add raw-body middleware and verify with STRIPE_WEBHOOK_SECRET.

const PRODUCT_TO_TIER = {
  'com.sayarat.subscription.basic.monthly': 'basic',
  'com.sayarat.subscription.pro.monthly': 'pro',
  'com.sayarat.subscription.premium.monthly': 'premium',
};

router.post('/', async (req, res) => {
  try {
    const event = req.body;
    if (!event || !event.type) {
      return res.status(400).json({ error: 'Invalid webhook payload' });
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data?.object);
        break;
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data?.object);
        break;
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data?.object);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpsert(event.data?.object);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data?.object);
        break;
      case 'charge.refunded':
        await handleChargeRefunded(event.data?.object);
        break;
      default:
        // ignore
        break;
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('stripe-webhook error:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

async function handleCheckoutSessionCompleted(session) {
  if (!session) return;

  const metadata = session.metadata || {};
  const product_id = metadata.product_id || metadata.productId || null;
  const user_id = metadata.user_id || metadata.userId || null;

  const amount = session.amount_total ? Number(session.amount_total) / 100 : null;
  const currency = session.currency ? String(session.currency).toUpperCase() : 'USD';

  // Record purchase
  await sequelize.query(
    `INSERT INTO purchases (user_id, type, item_id, amount, currency, status, payment_provider, transaction_id, metadata, created_at, updated_at)
     VALUES (:user_id, :type, :item_id, :amount, :currency, :status, :provider, :transaction_id, :metadata::jsonb, NOW(), NOW())
     ON CONFLICT DO NOTHING`,
    {
      replacements: {
        user_id,
        type: 'stripe',
        item_id: product_id,
        amount: amount || 0,
        currency,
        status: 'completed',
        provider: 'stripe',
        transaction_id: session.id,
        metadata: JSON.stringify({
          ...metadata,
          stripe_customer_id: session.customer,
          stripe_session_id: session.id,
          payment_status: session.payment_status,
          customer_email: session.customer_email || session.customer_details?.email,
          payment_intent: session.payment_intent,
          subscription: session.subscription,
        }),
      },
    }
  );

  // Subscription purchases
  if (product_id && String(product_id).includes('subscription')) {
    const tier = PRODUCT_TO_TIER[product_id] || 'basic';
    const plan_name = tier === 'pro' ? 'Dealer Pro' : tier === 'premium' ? 'Dealer Premium' : 'Dealer Basic';

    await sequelize.query(
      `INSERT INTO subscriptions (user_id, plan_id, plan_name, status, price, billing_period, stripe_subscription_id, stripe_customer_id, created_at, updated_at)
       VALUES (:user_id, :plan_id, :plan_name, 'active', :price, 'month', :sub_id, :cust_id, NOW(), NOW())
       ON CONFLICT (user_id) DO UPDATE SET
         plan_id = EXCLUDED.plan_id,
         plan_name = EXCLUDED.plan_name,
         status = EXCLUDED.status,
         price = EXCLUDED.price,
         billing_period = EXCLUDED.billing_period,
         stripe_subscription_id = EXCLUDED.stripe_subscription_id,
         stripe_customer_id = EXCLUDED.stripe_customer_id,
         updated_at = NOW()`,
      {
        replacements: {
          user_id,
          plan_id: product_id,
          plan_name,
          price: amount || null,
          sub_id: session.subscription || null,
          cust_id: session.customer || null,
        },
      }
    );

    // Keep profile in sync (best-effort)
    if (user_id) {
      await sequelize.query(
        `UPDATE profiles SET is_dealer = true, subscription_tier = :tier, updated_at = NOW() WHERE id = :user_id`,
        { replacements: { tier, user_id } }
      ).catch(() => {});
    }
  }
}

async function handleSubscriptionUpsert(sub) {
  if (!sub) return;
  const user_id = sub.metadata?.user_id || null;
  const plan_id = sub.metadata?.product_id || sub.metadata?.plan_id || null;
  const plan_name = plan_id && PRODUCT_TO_TIER[plan_id]
    ? `Dealer ${PRODUCT_TO_TIER[plan_id][0].toUpperCase()}${PRODUCT_TO_TIER[plan_id].slice(1)}`
    : 'Subscription';

  if (!user_id) return;

  await sequelize.query(
    `INSERT INTO subscriptions (user_id, plan_id, plan_name, status, stripe_subscription_id, stripe_customer_id, current_period_start, current_period_end, updated_at, created_at)
     VALUES (:user_id, :plan_id, :plan_name, :status, :sub_id, :cust_id, :start_at, :end_at, NOW(), NOW())
     ON CONFLICT (user_id) DO UPDATE SET
       plan_id = EXCLUDED.plan_id,
       plan_name = EXCLUDED.plan_name,
       status = EXCLUDED.status,
       stripe_subscription_id = EXCLUDED.stripe_subscription_id,
       stripe_customer_id = EXCLUDED.stripe_customer_id,
       current_period_start = EXCLUDED.current_period_start,
       current_period_end = EXCLUDED.current_period_end,
       updated_at = NOW()`,
    {
      replacements: {
        user_id,
        plan_id: plan_id || 'stripe_subscription',
        plan_name,
        status: sub.status || 'active',
        sub_id: sub.id || null,
        cust_id: sub.customer || null,
        start_at: sub.current_period_start ? new Date(sub.current_period_start * 1000) : null,
        end_at: sub.current_period_end ? new Date(sub.current_period_end * 1000) : null,
      },
    }
  );
}

async function handleSubscriptionDeleted(sub) {
  if (!sub) return;
  const user_id = sub.metadata?.user_id || null;
  if (!user_id) return;
  await sequelize.query(
    `UPDATE subscriptions SET status = 'cancelled', cancelled_at = NOW(), updated_at = NOW() WHERE user_id = :user_id`,
    { replacements: { user_id } }
  );
  await sequelize.query(
    `UPDATE profiles SET is_dealer = false, subscription_tier = NULL, updated_at = NOW() WHERE id = :user_id`,
    { replacements: { user_id } }
  ).catch(() => {});
}

async function handleInvoicePaymentSucceeded(invoice) {
  if (!invoice) return;
  const sub_id = invoice.subscription || null;
  if (!sub_id) return;
  await sequelize.query(
    `UPDATE subscriptions SET status = 'active', updated_at = NOW() WHERE stripe_subscription_id = :sub_id`,
    { replacements: { sub_id } }
  );
}

async function handleInvoicePaymentFailed(invoice) {
  if (!invoice) return;
  const sub_id = invoice.subscription || null;
  if (!sub_id) return;
  await sequelize.query(
    `UPDATE subscriptions SET status = 'past_due', updated_at = NOW() WHERE stripe_subscription_id = :sub_id`,
    { replacements: { sub_id } }
  );
}

async function handleChargeRefunded(charge) {
  if (!charge) return;
  const payment_intent = charge.payment_intent || null;
  if (!payment_intent) return;

  // Mark any matching purchases as refunded (best-effort)
  await sequelize.query(
    `UPDATE purchases
     SET status = 'refunded', updated_at = NOW(), metadata = COALESCE(metadata, '{}'::jsonb) || :patch::jsonb
     WHERE (metadata->>'payment_intent') = :pi`,
    {
      replacements: {
        pi: payment_intent,
        patch: JSON.stringify({ refund: { id: charge.refunds?.data?.[0]?.id || null, at: new Date().toISOString() } }),
      },
    }
  ).catch(() => {});
}

module.exports = router;
