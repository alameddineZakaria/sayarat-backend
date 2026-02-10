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
 * /api/marks-section-as-read/offers/read-by-type:
 *   patch:
 *     summary: Mark offer notifications of a type as read
 *     description: Marks all unread offer notifications for the current user of the given type as read.
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type]
 *             properties:
 *               type:
 *                 type: string
 *                 example: "offers"
 *     responses:
 *       200:
 *         description: Notifications marked as read
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: { type: boolean, example: true }
 *                 type: { type: string, example: "offers" }
 *                 updatedCount: { type: integer, example: 5 }
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Missing/invalid type
 *       500:
 *         description: Server error
 */
router.patch("/offers/read-by-type", requireAuth, async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.user_id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const type = String(req.body?.type ?? "").trim();
    if (!type) return res.status(400).json({ message: "type is required" });

    const sql = `
      UPDATE offer_notifications
      SET is_read = true
      WHERE user_id = :userId
        AND type = :type
        AND is_read = false
      RETURNING id;
    `;

    const updated = await sequelize.query(sql, {
      replacements: { userId, type },
      type: sequelize.QueryTypes.SELECT,
    });

    return res.json({
      ok: true,
      type,
      updatedCount: (updated || []).length,
    });
  } catch (err) {
    console.error("PATCH /api/notifications/offers/read-by-type error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
