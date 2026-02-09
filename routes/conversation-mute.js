const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: ConversationMute
 *   description: Mute / unmute conversations
 */

/**
 * @swagger
 * /api/conversation-mute/conversations/{conversationId}/mute:
 *   post:
 *     summary: Mute or unmute a conversation
 *     description: |
 *       Toggles mute state for the current user.
 *       - If muted → unmute (delete row)
 *       - If not muted → mute (insert row)
 *       Operation is idempotent.
 *     tags: [ConversationMute]
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
 *         description: Mute state toggled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 conversationId:
 *                   type: string
 *                   example: "9f4b6a12-aaaa-bbbb-cccc-123456789abc"
 *                 muted:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Conversation not found (optional)
 *       500:
 *         description: Server error
 */
router.post("/conversations/:conversationId/mute", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { conversationId } = req.params;
    if (!conversationId) {
      return res.status(400).json({ message: "conversationId is required" });
    }

    // Check if already muted
    const checkSql = `
      SELECT 1
      FROM muted_conversations
      WHERE user_id = :userId
        AND conversation_id = :conversationId
      LIMIT 1;
    `;

    const isMuted = await sequelize.query(checkSql, {
      replacements: { userId, conversationId },
      type: sequelize.QueryTypes.SELECT,
    });

    let muted;

    if (isMuted.length > 0) {
      // 🔔 Unmute
      await sequelize.query(
        `
        DELETE FROM muted_conversations
        WHERE user_id = :userId
          AND conversation_id = :conversationId;
        `,
        {
          replacements: { userId, conversationId },
          type: sequelize.QueryTypes.DELETE,
        }
      );
      muted = false;
    } else {
      // 🔕 Mute (ignore duplicates)
      await sequelize.query(
        `
        INSERT INTO muted_conversations (user_id, conversation_id, muted_until)
        VALUES (:userId, :conversationId, NULL)
        ON CONFLICT (user_id, conversation_id) DO NOTHING;
        `,
        {
          replacements: { userId, conversationId },
          type: sequelize.QueryTypes.INSERT,
        }
      );
      muted = true;
    }

    return res.json({
      conversationId,
      muted,
    });
  } catch (err) {
    console.error("POST /api/conversations/:conversationId/mute error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
