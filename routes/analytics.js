const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin access and roles
 */

/**
 * @swagger
 * /api/analytics/admin/check:
 *   get:
 *     summary: Check admin access
 *     description: Checks whether the current user is an active admin.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin check result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isAdmin:
 *                   type: boolean
 *                   example: true
 *                 role:
 *                   type: string
 *                   nullable: true
 *                   example: "moderator"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/admin/check", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.query.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const sql = `
      SELECT role
      FROM admin_users
      WHERE user_id = :userId
        AND is_active = true
      LIMIT 1;
    `;

    const rows = await sequelize.query(sql, {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT,
    });

    if (rows.length > 0) {
      return res.json({ isAdmin: true, role: rows[0].role });
    }

    return res.json({ isAdmin: false, role: null });
  } catch (err) {
    console.error("GET /api/admin/check error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
