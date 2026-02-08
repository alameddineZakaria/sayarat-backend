const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: Security
 *   description: Account security, sessions, and linked accounts
 */

/**
 * @swagger
 * /api/handle-log-out-all-sessions/security/sessions/end-others:
 *   delete:
 *     summary: End all other sessions
 *     description: Logs the user out from all other devices by terminating all sessions where is_current=false.
 *     tags: [Security,queries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Other sessions ended successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 endedCount:
 *                   type: integer
 *                   example: 4
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete("/security/sessions/end-others", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const sql = `
      DELETE FROM user_sessions
      WHERE user_id = :userId
        AND is_current = false
      RETURNING id;
    `;

    const deleted = await sequelize.query(sql, {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT,
    });

    return res.json({
      ok: true,
      endedCount: (deleted || []).length,
    });
  } catch (err) {
    console.error("DELETE /api/security/sessions/end-others error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
