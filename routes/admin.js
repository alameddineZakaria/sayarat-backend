const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin access and roles
 */
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin access and roles
 */

/**
 * @swagger
 * /api/admin/status:
 *   get:
 *     summary: Check if current user is an adminssss
 *     description: |
 *       Checks whether the **authenticated user** is an active admin and returns their role.
 *
 *       - The user is normally identified from the **JWT token** (`req.user.id`).
 *       - A `user_id` query parameter is supported **only as a fallback** if authentication
 *         middleware is not enabled (not recommended for production).
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: false
 *         description: |
 *           Optional user ID used **only if authentication middleware is not injecting `req.user`**.
 *           When using JWT authentication, this parameter should NOT be provided.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: null
 *     responses:
 *       200:
 *         description: Admin status for the current user
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
 *                   example: "super_admin"
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Server error
 */

router.get("/status", requireAuth, async (req, res) => {
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
      return res.json({
        isAdmin: true,
        role: rows[0].role,
      });
    }

    return res.json({
      isAdmin: false,
      role: null,
    });
  } catch (err) {
    console.error("GET /api/admin/status error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
