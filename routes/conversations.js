const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: Conversations
 *   description: Conversation actions (delete/hide, restore, etc.)
 */

/**
 * @swagger
 * /api/conversations/{conversationId}/delete:
 *   post:
 *     summary: Delete (soft-delete) a conversation for the current user
 *     description: |
 *       Marks a conversation as deleted for the user by inserting a row into `deleted_conversations`.
 *       Uses ON CONFLICT DO NOTHING to make the operation idempotent (no error if already deleted).
 *     tags: [Conversations,queries]
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
 *         description: Conversation deleted (or already deleted)
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
 *                 alreadyDeleted:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Conversation not found (optional check)
 *       500:
 *         description: Server error
 */
router.post("/:conversationId/delete", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { conversationId } = req.params;
    if (!conversationId) return res.status(400).json({ message: "conversationId is required" });

    // (Optional) validate the conversation exists
    // Remove if you don’t need it.
    const exists = await sequelize.query(
      `SELECT 1 FROM conversations c WHERE c.id = :conversationId LIMIT 1`,
      {
        replacements: { conversationId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!exists || exists.length === 0) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Idempotent delete marker
    const sql = `
      INSERT INTO deleted_conversations (user_id, conversation_id)
      VALUES (:userId, :conversationId)
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
      alreadyDeleted: (inserted || []).length === 0,
    });
  } catch (err) {
    console.error("POST /api/conversations/:conversationId/delete error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
