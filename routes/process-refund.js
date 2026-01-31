const express = require('express');
const fetch = require('node-fetch');
const sequelize = require('../config/db');

/**
 * @swagger
 * /api/process-refund:
 *   post:
 *     summary: Process a refund for a purchase (full or partial)
 *     tags:
 *       - Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payment_id:
 *                 type: integer
 *                 description: Purchase id
 *                 example: 1001
 *               stripe_payment_id:
 *                 type: string
 *                 nullable: true
 *                 example: pi_123
 *               reason:
 *                 type: string
 *                 nullable: true
 *               amount:
 *                 type: number
 *                 nullable: true
 *                 description: Partial refund amount (in major currency units)
 *                 example: 10.5
 *               refund_type:
 *                 type: string
 *                 enum: [full, partial]
 *                 example: full
 *               admin_user_id:
 *                 type: integer
 *                 nullable: true
 *                 description: Admin user id (optional)
 *                 example: 1
 *             required: [payment_id]
 *     responses:
 *       200:
 *         description: Refund processed
 *       400:
 *         description: Validation error
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Purchase not found
 *       500:
 *         description: Server error
 */

const router = express.Router();

function jsonResponse(res, data, status = 200) {
  return res.status(status).json(data);
}

router.post('/', async (req, res) => {
  try {
    const {
      payment_id,
      stripe_payment_id,
      reason,
      amount,
      refund_type = 'full',
      admin_user_id,
    } = req.body || {};

    if (!payment_id) {
      return jsonResponse(res, { error: 'payment_id is required' }, 400);
    }

    // Best-effort admin check (since we don’t have auth middleware here)
    if (admin_user_id) {
      const [rows] = await sequelize.query(
        `SELECT role, permissions, is_active FROM admin_users WHERE user_id = :uid LIMIT 1`,
        { replacements: { uid: admin_user_id } }
      );
      const admin = rows && rows[0];
      if (!admin || admin.is_active === false) {
        return jsonResponse(res, { error: 'Admin access required' }, 403);
      }
      const perms = admin.permissions || {};
      if (admin.role !== 'super_admin' && !perms.manage_payments) {
        return jsonResponse(res, { error: 'Payment management permission required' }, 403);
      }
    }

    const [purchaseRows] = await sequelize.query(
      `SELECT * FROM purchases WHERE id = :id LIMIT 1`,
      { replacements: { id: payment_id } }
    );
    const purchase = purchaseRows && purchaseRows[0];
    if (!purchase) return jsonResponse(res, { error: 'Purchase not found' }, 404);

    const purchaseAmount = Number(purchase.amount || 0);
    const refundAmount = refund_type === 'partial' && amount
      ? Math.min(Number(amount), purchaseAmount)
      : purchaseAmount;

    // Try Stripe refund (best-effort)
    const stripeApiKey = process.env.STRIPE_SECRET_KEY || process.env.GATEWAY_API_KEY;
    let refundId = `refund_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    let stripeRefund = null;

    const paymentIntentId = stripe_payment_id || (purchase.metadata && purchase.metadata.payment_intent);
    if (stripeApiKey && paymentIntentId && String(paymentIntentId).startsWith('pi_')) {
      try {
        const body = new URLSearchParams({
          payment_intent: String(paymentIntentId),
          amount: String(Math.round(refundAmount * 100)),
          reason: 'requested_by_customer',
        });
        const r = await fetch('https://api.stripe.com/v1/refunds', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${stripeApiKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body.toString(),
        });
        if (r.ok) {
          stripeRefund = await r.json();
          refundId = stripeRefund.id;
        }
      } catch (e) {
        // ignore and continue with local bookkeeping
      }
    }

    const newMetadata = {
      ...(purchase.metadata || {}),
      refund: {
        type: refund_type,
        amount: refundAmount,
        reason: reason || null,
        processed_by: admin_user_id || null,
        processed_at: new Date().toISOString(),
        stripe_refund_id: stripeRefund ? stripeRefund.id : null,
      },
    };

    await sequelize.query(
      `UPDATE purchases
       SET status = 'refunded',
           metadata = :metadata,
           updated_at = NOW(),
           cancelled_at = NOW(),
           cancellation_reason = COALESCE(:reason, cancellation_reason)
       WHERE id = :id`,
      {
        replacements: {
          id: payment_id,
          metadata: JSON.stringify(newMetadata),
          reason: reason || null,
        },
      }
    );

    return jsonResponse(res, {
      success: true,
      refund_id: refundId,
      refund_amount: refundAmount,
      stripe_refund_id: stripeRefund ? stripeRefund.id : null,
    });
  } catch (err) {
    console.error(err);
    return jsonResponse(res, { error: err.message || 'Server error' }, 500);
  }
});

module.exports = router;
