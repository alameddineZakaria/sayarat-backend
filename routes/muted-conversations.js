const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: MutedConversations
 *   description: Mute/unmute conversations for a user
 */

/**
 * @swagger
 * /api/muted-conversations/conversations/{conversationId}/mute:
 *   post:
 *     summary: Mute a conversation for the current user
 *     description: Creates a row in muted_conversations (idempotent). If already muted, no error.
 *     tags: [MutedConversations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Conversation ID
 *     responses:
 *       200:
 *         description: Muted successfully (or already muted)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: { type: boolean, example: true }
 *                 conversationId: { type: string, example: "9f4b6a12-aaaa-bbbb-cccc-123456789abc" }
 *                 muted: { type: boolean, example: true }
 *                 alreadyMuted: { type: boolean, example: false }
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/conversations/:conversationId/mute", requireAuth, async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.user_id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { conversationId } = req.params;

    // INSERT ... RETURNING lets us know if it was newly inserted
    const sql = `
      INSERT INTO muted_conversations (user_id, conversation_id, muted_until)
      VALUES (:userId, :conversationId, NULL)
      ON CONFLICT (user_id, conversation_id) DO NOTHING
      RETURNING user_id, conversation_id;
    `;

    const inserted = await sequelize.query(sql, {
      replacements: { userId, conversationId },
      type: sequelize.QueryTypes.SELECT,
    });

    return res.json({
      ok: true,
      conversationId,
      muted: true,
      alreadyMuted: (inserted || []).length === 0,
    });
  } catch (err) {
    console.error("POST /api/conversations/:conversationId/mute error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/muted-conversations/conversations/{conversationId}/mute:
 *   delete:
 *     summary: Unmute a conversation for the current user
 *     description: Deletes the row from muted_conversations (idempotent). If not muted, no error.
 *     tags: [MutedConversations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Conversation ID
 *     responses:
 *       200:
 *         description: Unmuted successfully (or already unmuted)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: { type: boolean, example: true }
 *                 conversationId: { type: string, example: "9f4b6a12-aaaa-bbbb-cccc-123456789abc" }
 *                 muted: { type: boolean, example: false }
 *                 removedCount: { type: integer, example: 1 }
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete("/conversations/:conversationId/mute", requireAuth, async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.user_id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { conversationId } = req.params;

    const sql = `
      DELETE FROM muted_conversations
      WHERE user_id = :userId
        AND conversation_id = :conversationId
      RETURNING conversation_id;
    `;

    const deleted = await sequelize.query(sql, {
      replacements: { userId, conversationId },
      type: sequelize.QueryTypes.SELECT,
    });

    return res.json({
      ok: true,
      conversationId,
      muted: false,
      removedCount: (deleted || []).length,
    });
  } catch (err) {
    console.error("DELETE /api/conversations/:conversationId/mute error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
