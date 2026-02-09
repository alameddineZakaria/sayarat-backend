const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: Billing
 *   description: Subscription and billing history
 */

/**
 * @swagger
 * /api/subscription-billing/billing/overview:
 *   get:
 *     summary: Get subscription + billing history
 *     description: Returns the latest subscription and the last purchases (billing history) for the current user.
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: purchasesLimit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: How many purchases to return
 *     responses:
 *       200:
 *         description: Billing overview
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subscription:
 *                   type: object
 *                   nullable: true
 *                   additionalProperties: true
 *                 purchases:
 *                   type: array
 *                   items:
 *                     type: object
 *                     additionalProperties: true
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/billing/overview", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.query.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const limitRaw = parseInt(String(req.query.purchasesLimit ?? "20"), 10);
    const purchasesLimit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 100) : 20;

    const [subRows, purchaseRows] = await Promise.all([
      sequelize.query(
        `
        SELECT *
        FROM subscriptions
        WHERE user_id = :userId
        ORDER BY created_at DESC
        LIMIT 1;
        `,
        { replacements: { userId }, type: sequelize.QueryTypes.SELECT }
      ),
      sequelize.query(
        `
        SELECT *
        FROM purchases
        WHERE user_id = :userId
        ORDER BY created_at DESC
        LIMIT :limit;
        `,
        { replacements: { userId, limit: purchasesLimit }, type: sequelize.QueryTypes.SELECT }
      ),
    ]);

    // If you need numeric casting here, you can normalize:
    // const purchases = (purchaseRows || []).map(p => ({ ...p, amount: Number(p.amount || 0) }));

    return res.json({
      subscription: subRows?.[0] ?? null,
      purchases: purchaseRows || [],
    });
  } catch (err) {
    console.error("GET /api/billing/overview error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
