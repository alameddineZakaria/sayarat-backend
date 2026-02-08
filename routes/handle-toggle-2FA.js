const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: TwoFactorAuth
 *   description: Two-factor authentication (2FA) management
 */

/**
 * @swagger
 * /api/handle-toggle-2FA/disable:
 *   patch:
 *     summary: Disable 2FA
 *     description: Disables two-factor authentication for the current user.
 *     tags: [TwoFactorAutha,queries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 2FA disabled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                       example: "b1c2d3e4-1111-2222-3333-444455556666"
 *                     is_enabled:
 *                       type: boolean
 *                       example: false
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-02-08T12:34:56.789Z"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: 2FA settings not found for this user
 *       500:
 *         description: Server error
 */
router.patch("/disable", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const sql = `
      UPDATE two_factor_auth
      SET
        is_enabled = FALSE,
        updated_at = NOW()
      WHERE user_id = :userId
      RETURNING user_id, is_enabled, updated_at;
    `;

    const rows = await sequelize.query(sql, {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT,
    });

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "2FA settings not found" });
    }

    return res.status(200).json({ ok: true, data: rows[0] });
  } catch (err) {
    console.error("PATCH /api/2fa/disable error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
