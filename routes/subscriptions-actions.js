const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

// You can inject your Stripe cancellation service here
// const { cancelStripeSubscription } = require("../services/stripe");

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Subscription lifecycle actions (cancel, renew, etc.)
 */

/**
 * @swagger
 * /api/subscriptions-actions/subscriptions/{subscriptionId}/cancel:
 *   post:
 *     summary: Cancel a subscription
 *     description: |
 *       Cancels a subscription for the current user.
 *       - For Stripe subscriptions, you should cancel on Stripe (server-side) then update DB.
 *       - For Apple/Google, cancellation is handled in the store; this endpoint can optionally mark DB as cancelled.
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subscriptionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription ID in your database
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cancelInPlatform:
 *                 type: boolean
 *                 default: true
 *                 description: If true and platform=stripe, cancel in Stripe as well.
 *     responses:
 *       200:
 *         description: Subscription cancelled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: { type: boolean, example: true }
 *                 subscription:
 *                   type: object
 *                   additionalProperties: true
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not allowed (subscription not owned by user)
 *       404:
 *         description: Subscription not found
 *       409:
 *         description: Already cancelled
 *       500:
 *         description: Server error
 */
router.post("/subscriptions/:subscriptionId/cancel", /* requireAuth, */ async (req, res) => {
  const trx = await sequelize.transaction();
  try {
    const userId = req.user?.id || req.body?.user_id; // prefer req.user.id
    if (!userId) {
      await trx.rollback();
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { subscriptionId } = req.params;
    const cancelInPlatform =
      req.body?.cancelInPlatform === undefined ? true : Boolean(req.body.cancelInPlatform);

    // Lock the subscription row
    const subRows = await sequelize.query(
      `
      SELECT *
      FROM subscriptions
      WHERE id = :subscriptionId
        AND user_id = :userId
      FOR UPDATE
      `,
      {
        replacements: { subscriptionId, userId },
        type: sequelize.QueryTypes.SELECT,
        transaction: trx,
      }
    );

    const sub = subRows?.[0];
    if (!sub) {
      await trx.rollback();
      return res.status(404).json({ message: "Subscription not found" });
    }

    if (sub.status === "cancelled") {
      await trx.rollback();
      return res.status(409).json({ message: "Subscription already cancelled" });
    }

    // 1) Cancel in platform if needed (Stripe)
    // Do platform calls OUTSIDE db write? Either is fine.
    // Here we do it inside try before update. If it fails we rollback.
    if (cancelInPlatform && sub.platform === "stripe" && sub.platform_subscription_id) {
      // TODO: call your Stripe cancel here:
      // await cancelStripeSubscription(sub.platform_subscription_id);

      // If you use your existing function, you can call it here server-side
      // (recommended vs client calling it).
    }

    // For apple/google: you generally can't cancel from server unless you integrate store APIs;
    // you may choose to just mark local status as "cancel_requested" instead of "cancelled".

    // 2) Update DB
    const updatedRows = await sequelize.query(
      `
      UPDATE subscriptions
      SET status = 'cancelled',
          updated_at = NOW()
      WHERE id = :subscriptionId
        AND user_id = :userId
      RETURNING *;
      `,
      {
        replacements: { subscriptionId, userId },
        type: sequelize.QueryTypes.SELECT,
        transaction: trx,
      }
    );

    await trx.commit();

    return res.json({ ok: true, subscription: updatedRows?.[0] ?? null });
  } catch (err) {
    console.error("POST /api/subscriptions/:subscriptionId/cancel error:", err);
    try { await trx.rollback(); } catch (_) {}
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
