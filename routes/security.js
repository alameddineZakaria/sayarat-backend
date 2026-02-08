const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: Security
 *   description: Security settings, linked accounts, and sessions
 */

/**
 * @swagger
 * /api/security/security/overview:
 *   get:
 *     summary: Load security overview for the current user
 *     description: |
 *       Returns:
 *       - linked accounts
 *       - active sessions (ordered by last_active_at DESC)
 *       - two-factor auth settings (or null if not configured)
 *     tags: [Security,queries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Security overview loaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 linkedAccounts:
 *                   type: array
 *                   items: { type: object, additionalProperties: true }
 *                 sessions:
 *                   type: array
 *                   items: { type: object, additionalProperties: true }
 *                 twoFactor:
 *                   type: object
 *                   nullable: true
 *                   additionalProperties: true
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/security/overview", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.query.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // Run in parallel (fast and simple)
    const [linkedAccounts, sessions, twoFactorRows] = await Promise.all([
      sequelize.query(
        `SELECT * FROM linked_accounts WHERE user_id = :userId;`,
        { replacements: { userId }, type: sequelize.QueryTypes.SELECT }
      ),
      sequelize.query(
        `SELECT * FROM user_sessions WHERE user_id = :userId ORDER BY last_active_at DESC;`,
        { replacements: { userId }, type: sequelize.QueryTypes.SELECT }
      ),
      sequelize.query(
        `SELECT * FROM two_factor_auth WHERE user_id = :userId LIMIT 1;`,
        { replacements: { userId }, type: sequelize.QueryTypes.SELECT }
      ),
    ]);

    return res.json({
      linkedAccounts: linkedAccounts || [],
      sessions: sessions || [],
      twoFactor: twoFactorRows?.[0] ?? null,
    });
  } catch (err) {
    console.error("GET /api/security/overview error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
