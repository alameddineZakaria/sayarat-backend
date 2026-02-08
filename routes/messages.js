const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messaging operations
 */

/**
 * @swagger
 * /api/conversations/{conversationId}/messages:
 *   delete:
 *     summary: Delete all messages in a conversation for the current user
 *     description: |
 *       Deletes all messages in the given conversation where the current user is either the sender or the receiver.
 *       This is destructive and cannot be undone.
 *     tags: [Messages,queries]
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
 *         description: Messages deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 conversationId:
 *                   type: string
 *                   example: "7a1d2c3e-1111-2222-3333-444455556666"
 *                 deletedCount:
 *                   type: integer
 *                   example: 42
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: User not allowed to delete messages in this conversation (optional check)
 *       500:
 *         description: Server error
 */
router.delete("/conversations/:conversationId/messages", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { conversationId } = req.params;
    if (!conversationId) return res.status(400).json({ message: "conversationId is required" });

    // Delete and return count
    const sql = `
      DELETE FROM messages
      WHERE conversation_id = :conversationId
        AND (sender_id = :userId OR receiver_id = :userId)
      RETURNING id;
    `;

    const deletedRows = await sequelize.query(sql, {
      replacements: { conversationId, userId },
      type: sequelize.QueryTypes.SELECT,
    });

    return res.json({
      ok: true,
      conversationId,
      deletedCount: (deletedRows || []).length,
    });
  } catch (err) {
    console.error("DELETE /api/conversations/:conversationId/messages error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
