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
 * /api/mark-all-as-read/offers/read-all:
 *   patch:
 *     summary: Mark all offer notifications as read
 *     description: Marks all unread offer notifications as read for the current user.
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications marked as read
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 updatedCount:
 *                   type: integer
 *                   example: 12
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.patch("/offers/read-all", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.user_id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const sql = `
      UPDATE offer_notifications
      SET is_read = true
      WHERE user_id = :userId
        AND is_read = false
      RETURNING id;
    `;

    const updatedRows = await sequelize.query(sql, {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT,
    });

    return res.json({
      ok: true,
      updatedCount: (updatedRows || []).length,
    });
  } catch (err) {
    console.error("PATCH /api/notifications/offers/read-all error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
