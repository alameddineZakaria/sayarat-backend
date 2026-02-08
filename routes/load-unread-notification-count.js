const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: User notifications (offers, messages, etc.)
 */

/**
 * @swagger
 * /api/load-unread-notification-count/offers/unread-count:
 *   get:
 *     summary: Get unread offer notification count
 *     description: Returns the total number of unread offer notifications for the current user.
 *     tags: [Notifications,queries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Unread notification count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 7
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/load-unread-notification-count/offers/unread-count", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.query.user_id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const sql = `
      SELECT COUNT(*)::int AS count
      FROM offer_notifications
      WHERE user_id = :userId
        AND is_read = false;
    `;

    const [row] = await sequelize.query(sql, {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT,
    });

    return res.json({ count: row?.count ?? 0 });
  } catch (err) {
    console.error("GET /api/notifications/offers/unread-count error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
