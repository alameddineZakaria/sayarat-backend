const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: User subscriptions and billing status
 */

/**
 * @swagger
 * /api/subscriptions/subscriptions/current:
 *   get:
 *     summary: Get current active subscription for the user
 *     description: Returns the user's active subscription (if any). If none, returns null.
 *     tags: [Subscriptions,queries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   nullable: true
 *                   type: object
 *                   additionalProperties: true
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/subscriptions/current", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.query.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const sql = `
      SELECT *
      FROM subscriptions
      WHERE user_id = :userId
        AND status = 'active'
      ORDER BY updated_at DESC NULLS LAST, created_at DESC NULLS LAST
      LIMIT 1;
    `;

    const rows = await sequelize.query(sql, {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT,
    });

    return res.json({ data: rows?.[0] ?? null });
  } catch (err) {
    console.error("GET /api/subscriptions/current error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
