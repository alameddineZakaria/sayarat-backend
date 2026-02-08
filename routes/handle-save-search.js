const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: SavedSearches
 *   description: Saved search management
 */

/**
 * @swagger
 * /api/handle-save-search/saved-searches:
 *   post:
 *     summary: Create a saved search
 *     description: Creates a saved search for the current user (optionally enabling notifications and weekly email digest).
 *     tags: [SavedSearches,queries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "My Toyota Search"
 *               notifyNewMatches:
 *                 type: boolean
 *                 default: true
 *                 example: true
 *               emailDigestEnabled:
 *                 type: boolean
 *                 default: false
 *                 example: true
 *               filters:
 *                 description: Optional search filters payload (store as JSONB)
 *                 type: object
 *                 additionalProperties: true
 *     responses:
 *       201:
 *         description: Saved search created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   additionalProperties: true
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/saved-searches", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const name = String(req.body?.name ?? "").trim();
    if (!name) return res.status(400).json({ message: "name is required" });

    const notifyNewMatches =
      req.body?.notifyNewMatches === undefined ? true : Boolean(req.body.notifyNewMatches);

    const emailDigestEnabled =
      req.body?.emailDigestEnabled === undefined ? false : Boolean(req.body.emailDigestEnabled);

    // optional JSON filters
    const filters = req.body?.filters ?? null;

    const sql = `
      INSERT INTO saved_searches (
        user_id,
        name,
        notify_new_matches,
        email_digest_enabled,
        filters,
        created_at,
        updated_at,
        last_viewed_at,
        new_matches_since_view
      )
      VALUES (
        :userId,
        :name,
        :notifyNewMatches,
        :emailDigestEnabled,
        :filters,
        NOW(),
        NOW(),
        NOW(),
        0
      )
      RETURNING *;
    `;

    const rows = await sequelize.query(sql, {
      replacements: {
        userId,
        name,
        notifyNewMatches,
        emailDigestEnabled,
        // If filters column is jsonb, Sequelize will send JSON fine;
        // if you need explicit cast: use :filters::jsonb in SQL
        filters,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    return res.status(201).json({ ok: true, data: rows?.[0] ?? null });
  } catch (err) {
    console.error("POST /api/saved-searches error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
