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
 * /api/handle-log-out-session/security/sessions/{sessionId}:
 *   delete:
 *     summary: Terminate a user session
 *     description: |
 *       Ends a specific session for the current user.
 *       The current session should not be terminated using this endpoint.
 *     tags: [Security,queries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     responses:
 *       200:
 *         description: Session terminated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 sessionId:
 *                   type: string
 *                   example: "abc123-session-id"
 *       400:
 *         description: Cannot terminate current session
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Session not found
 *       500:
 *         description: Server error
 */
router.delete("/security/sessions/:sessionId", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { sessionId } = req.params;

    // Optional safety: block deleting current session server-side
    if (req.user?.session_id && req.user.session_id === sessionId) {
      return res.status(400).json({ message: "Cannot terminate current session" });
    }

    const sql = `
      DELETE FROM user_sessions
      WHERE id = :sessionId
        AND user_id = :userId
      RETURNING id;
    `;

    const rows = await sequelize.query(sql, {
      replacements: { sessionId, userId },
      type: sequelize.QueryTypes.SELECT,
    });

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "Session not found" });
    }

    return res.json({
      ok: true,
      sessionId,
    });
  } catch (err) {
    console.error("DELETE /api/security/sessions/:sessionId error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
