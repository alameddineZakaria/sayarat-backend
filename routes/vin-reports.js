const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: VinReports
 *   description: VIN report purchases and history
 */

/**
 * @swagger
 * /api/vin-reports/vin-reports:
 *   get:
 *     summary: List VIN report purchases for current user
 *     description: Returns the user's VIN report purchase history ordered by newest first.
 *     tags: [VinReports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: VIN report purchases
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
router.get("/vin-reports", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.query.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const sql = `
      SELECT *
      FROM vin_report_purchases
      WHERE user_id = :userId
      ORDER BY created_at DESC;
    `;

    const rows = await sequelize.query(sql, {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT,
    });

    return res.json({ data: rows || [] });
  } catch (err) {
    console.error("GET /api/vin-reports error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
