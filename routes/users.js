const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile and verification status
 */

/**
 * @swagger
 * /api/users/users/phone-verification:
 *   get:
 *     summary: Get phone verification status
 *     description: Returns whether the current user's phone number is verified.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Phone verification status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 phone_verified:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/users/phone-verification", requireAuth, async (req, res) => {
  try {
    const userId = req.user?.id || req.query.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const sql = `
      SELECT phone_verified
      FROM users
      WHERE id = :userId
      LIMIT 1;
    `;

    const rows = await sequelize.query(sql, {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT,
    });

    return res.json({
      phone_verified: rows?.[0]?.phone_verified ?? false,
    });
  } catch (err) {
    console.error("GET /api/users/phone-verification error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
