const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: User notifications (offers, messages, etc.)
 */

/**
 * @swagger
 * /api/offer-notifications/offers/{notificationId}/read:
 *   patch:
 *     summary: Mark an offer notification as read
 *     description: Marks a notification as read for the current user.
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Offer notification ID
 *     responses:
 *       200:
 *         description: Notification marked as read
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: { type: boolean, example: true }
 *                 notificationId: { type: string }
 *                 updated: { type: boolean, example: true }
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Notification not found (or not owned by user)
 *       500:
 *         description: Server error
 */
router.patch("/notifications/offers/:notificationId/read", requireAuth, async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { notificationId } = req.params;

    // Security: ensure user can only update their own notifications
    const sql = `
      UPDATE offer_notifications
      SET is_read = true
      WHERE id = :notificationId
        AND user_id = :userId
        AND (is_read IS DISTINCT FROM true)
      RETURNING id;
    `;

    const updatedRows = await sequelize.query(sql, {
      replacements: { notificationId, userId },
      type: sequelize.QueryTypes.SELECT,
    });

    if (!updatedRows || updatedRows.length === 0) {
      // either not found, not owned by user, or already read
      // choose 404 or 200. Here: 404 only if it doesn't exist/owned; otherwise treat as idempotent.
      // We'll do idempotent success by checking existence.
      const exists = await sequelize.query(
        `SELECT 1 FROM offer_notifications WHERE id = :notificationId AND user_id = :userId LIMIT 1`,
        { replacements: { notificationId, userId }, type: sequelize.QueryTypes.SELECT }
      );

      if (!exists || exists.length === 0) {
        return res.status(404).json({ message: "Notification not found" });
      }

      return res.json({ ok: true, notificationId, updated: false });
    }

    return res.json({ ok: true, notificationId, updated: true });
  } catch (err) {
    console.error("PATCH /api/notifications/offers/:notificationId/read error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
