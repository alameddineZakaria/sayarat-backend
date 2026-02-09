const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth"); // if you have it

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messaging & search
 */

/**
 * @swagger
 * /api/message-search/search:
 *   get:
 *     summary: Search text messages across user's conversations
 *     description: Searches message content using a case-insensitive partial match (ILIKE). Excludes image/voice pseudo-messages on the server.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 2
 *         description: Search query (min length 2)
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 200
 *           default: 100
 *         description: Max results to return
 *       - in: query
 *         name: conversation_ids
 *         required: false
 *         style: form
 *         explode: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Optional list of conversation IDs to restrict the search. If omitted, server loads the user's conversation IDs.
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 q:
 *                   type: string
 *                   example: "toyota"
 *                 limit:
 *                   type: integer
 *                   example: 100
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: object
 *                         description: Message row from messages table
 *                         additionalProperties: true
 *                       conversation:
 *                         type: object
 *                         description: Conversation row from conversations table (id, title/name, etc.)
 *                         additionalProperties: true
 *                       matchedText:
 *                         type: string
 *                         description: Short snippet around the match
 *                         example: "...looking for a Toyota Corolla..."
 *       400:
 *         description: Invalid input (e.g. q too short)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/search", /* requireAuth, */ async (req, res) => {
  try {
    // Auth: prefer req.user.id (from your auth middleware)
    const userId = req.user?.id || req.query.user_id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const q = String(req.query.q ?? "").trim();
    if (q.length < 2) return res.status(400).json({ message: "q must be at least 2 characters" });

    const limitRaw = parseInt(String(req.query.limit ?? "100"), 10);
    const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 200) : 100;

    // conversation_ids may come as:
    // - ?conversation_ids=1&conversation_ids=2
    // - ?conversation_ids[]=1&conversation_ids[]=2
    // - ?conversation_ids=1,2 (depending on client)
    let conversationIds = req.query.conversation_ids;

    const normalizeArray = (v) => {
      if (!v) return null;
      if (Array.isArray(v)) return v.flatMap(x => String(x).split(",")).map(s => s.trim()).filter(Boolean);
      return String(v).split(",").map(s => s.trim()).filter(Boolean);
    };

    const providedConversationIds = normalizeArray(conversationIds);

    // If not provided, load conversation IDs the user participates in
    // Adjust this query based on your schema:
    // Example assumes a conversation_participants table:
    // conversation_participants(conversation_id, user_id)
    let idsToSearch = providedConversationIds;

    if (!idsToSearch || idsToSearch.length === 0) {
      const convSql = `
        SELECT cp.conversation_id
        FROM conversation_participants cp
        WHERE cp.user_id = :userId
      `;
      const rows = await sequelize.query(convSql, {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT,
      });

      idsToSearch = rows.map(r => r.conversation_id);
    }

    if (!idsToSearch || idsToSearch.length === 0) {
      return res.json({ q, limit, results: [] });
    }

    // Search messages
    const msgSql = `
      SELECT m.*
      FROM messages m
      WHERE m.conversation_id = ANY(:conversationIds::uuid[])
        AND m.content ILIKE ('%' || :q || '%')
      ORDER BY m.created_at DESC
      LIMIT :limit
    `;

    const messages = await sequelize.query(msgSql, {
      replacements: { conversationIds: idsToSearch, q, limit },
      type: sequelize.QueryTypes.SELECT,
    });

    // Load conversations for mapping (minimal columns; adjust to your table fields)
    const convSql2 = `
      SELECT c.*
      FROM conversations c
      WHERE c.id = ANY(:conversationIds::uuid[])
    `;
    const conversations = await sequelize.query(convSql2, {
      replacements: { conversationIds: idsToSearch },
      type: sequelize.QueryTypes.SELECT,
    });

    const convById = new Map(conversations.map(c => [String(c.id), c]));

    // server-side filter like your client filter
    const filtered = (messages || []).filter(m => {
      const content = String(m.content ?? "");
      return !content.startsWith("[IMAGE:") && !content.startsWith("[VOICE:");
    });

    // simple matchedText snippet (similar to extractMatchedText)
    const makeSnippet = (text, needle) => {
      const t = String(text ?? "");
      const n = String(needle ?? "");
      const idx = t.toLowerCase().indexOf(n.toLowerCase());
      if (idx < 0) return t.slice(0, 120);
      const start = Math.max(idx - 40, 0);
      const end = Math.min(idx + n.length + 40, t.length);
      const prefix = start > 0 ? "..." : "";
      const suffix = end < t.length ? "..." : "";
      return prefix + t.slice(start, end) + suffix;
    };

    const results = filtered
      .map(m => {
        const conversation = convById.get(String(m.conversation_id));
        if (!conversation) return null;
        return {
          message: m,
          conversation,
          matchedText: makeSnippet(m.content, q),
        };
      })
      .filter(Boolean);

    return res.json({ q, limit, results });
  } catch (err) {
    console.error("GET /api/search error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
