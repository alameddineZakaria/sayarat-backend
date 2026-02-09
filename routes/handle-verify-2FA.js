const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: TwoFactorAuth
 *   description: Two-factor authentication (2FA) settings
 */

/**
 * @swagger
 * /api/handle-verify-2FA/disable:
 *   post:
 *     summary: Disable 2FA
 *     description: Disables two-factor authentication for the current user.
 *     tags: [TwoFactorAuth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 2FA disabled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: { type: boolean, example: true }
 *                 is_enabled: { type: boolean, example: false }
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/disable", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.user_id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    await sequelize.query(
      `
      UPDATE two_factor_auth
      SET is_enabled = false,
          updated_at = NOW()
      WHERE user_id = :userId;
      `,
      { replacements: { userId }, type: sequelize.QueryTypes.UPDATE }
    );

    return res.json({ ok: true, is_enabled: false });
  } catch (err) {
    console.error("POST /api/security/2fa/disable error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
