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
 * /api/load-active-listings-count/vehicles/active-count:
 *   get:
 *     summary: Get active listings count for current user
 *     description: Returns how many active vehicles the current user has.
 *     tags: [Vehicles,queries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Count returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 4
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/vehicles/active-count", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.query.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const sql = `
      SELECT COUNT(*)::int AS count
      FROM vehicles
      WHERE user_id = :userId
        AND status = 'active';
    `;

    const rows = await sequelize.query(sql, {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT,
    });

    return res.json({ count: rows?.[0]?.count ?? 0 });
  } catch (err) {
    console.error("GET /api/vehicles/active-count error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
