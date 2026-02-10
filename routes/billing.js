const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: Billing
 *   description: Subscription and billing history
 */

/**
 * @swagger
 * /api/billing/billing/subscription-data:
 *   get:
 *     summary: Load subscription + billing history
 *     description: Returns the latest subscription and the most recent purchases for the current user.
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Max purchases to return
 *     responses:
 *       200:
 *         description: Subscription and billing history
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
router.get("/billing/subscription-data", requireAuth, async (req, res) => {
  try {
    const userId = req.user?.id || req.query.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const limitRaw = parseInt(String(req.query.limit ?? "20"), 10);
    const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 100) : 20;

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
        { replacements: { userId, limit }, type: sequelize.QueryTypes.SELECT }
      ),
    ]);

    return res.json({
      subscription: subRows?.[0] ?? null,
      purchases: purchaseRows || [],
    });
  } catch (err) {
    console.error("GET /api/billing/subscription-data error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
