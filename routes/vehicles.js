const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Vehicle listings
 */

/**
 * @swagger
 * /api/vehicles/vehicles/my:
 *   get:
 *     summary: Get current user's listings
 *     description: Returns vehicles belonging to the current user, ordered by newest first.
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: includeDeleted
 *         required: false
 *         schema:
 *           type: boolean
 *           default: true
 *         description: |
 *           If false, filters out deleted vehicles (is_deleted IS NULL OR is_deleted = false).
 *           If true, returns all vehicles for the user (including deleted).
 *     responses:
 *       200:
 *         description: Listings loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     additionalProperties: true
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/vehicles/my", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.query.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const includeDeleted = String(req.query.includeDeleted ?? "true").toLowerCase() !== "false";

    const sql = `
      SELECT v.*
      FROM vehicles v
      WHERE v.user_id = :userId
      ${includeDeleted ? "" : "AND (v.is_deleted IS NULL OR v.is_deleted = false)"}
      ORDER BY v.created_at DESC;
    `;

    const rows = await sequelize.query(sql, {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT,
    });

    // Map status like your client does
    const data = (rows || []).map((listing) => ({
      ...listing,
      status: listing.is_deleted ? "deleted" : (listing.status || "active"),
    }));

    return res.json({ data });
  } catch (err) {
    console.error("GET /api/vehicles/my error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
