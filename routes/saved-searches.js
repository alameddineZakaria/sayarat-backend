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
 * /api/saved-searches/saved-searches/{searchId}/run:
 *   post:
 *     summary: Run a saved search
 *     description: |
 *       Marks a saved search as viewed by resetting `new_matches_since_view`
 *       and updating `last_viewed_at`. The actual search execution is done client-side.
 *     tags: [SavedSearches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: searchId
 *         required: true
 *         schema:
 *           type: string
 *         description: Saved search ID
 *     responses:
 *       200:
 *         description: Saved search marked as viewed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 searchId:
 *                   type: string
 *                   example: "a1b2c3d4-1111-2222-3333-444455556666"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Saved search not found
 *       500:
 *         description: Server error
 */
router.post("/saved-searches/:searchId/run", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { searchId } = req.params;

    const sql = `
      UPDATE saved_searches
      SET last_viewed_at = NOW(),
          new_matches_since_view = 0
      WHERE id = :searchId
        AND user_id = :userId
      RETURNING id;
    `;

    const rows = await sequelize.query(sql, {
      replacements: { searchId, userId },
      type: sequelize.QueryTypes.SELECT,
    });

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "Saved search not found" });
    }

    return res.json({
      ok: true,
      searchId,
    });
  } catch (err) {
    console.error("POST /api/saved-searches/:searchId/run error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
