// routes/listing-boosts.js
const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
const requireAuth = require("../middleware/requireAuth");
/**
 * @swagger
 * tags:
 *   name: ListingBoosts
 *   description: Listing boosts analytics and history
 */

/**
 * @swagger
 * /api/listing-boosts:
 *   get:
 *     summary: Get current user's listing boosts (with vehicle info)
 *     tags: [ListingBoosts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, expired, canceled, pending]
 *         required: false
 *         description: Optional filter by boost status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 200
 *           default: 50
 *         required: false
 *         description: Max items to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         required: false
 *         description: Pagination offset
 *     responses:
 *       200:
 *         description: Boost list returned successfully
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
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "a3c1e3ce-1d36-4a2d-9d83-4d2b8a9a9c11"
 *                       user_id:
 *                         type: string
 *                         example: "b1d7b4c6-5c1b-4e3d-8b0f-7f4b9e2a1c22"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       status:
 *                         type: string
 *                         example: "active"
 *                       impressions:
 *                         type: integer
 *                         example: 1200
 *                       clicks:
 *                         type: integer
 *                         example: 84
 *                       inquiries:
 *                         type: integer
 *                         example: 6
 *                       amount_paid:
 *                         type: number
 *                         example: 49.99
 *                       vehicle:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           title:
 *                             type: string
 *                             example: "Toyota Corolla 2020"
 *                           make:
 *                             type: string
 *                             example: "Toyota"
 *                           model:
 *                             type: string
 *                             example: "Corolla"
 *                           year:
 *                             type: integer
 *                             example: 2020
 *                           images:
 *                             description: Vehicle images array/json depending on schema
 *                             oneOf:
 *                               - type: array
 *                                 items: { type: string }
 *                               - type: object
 *                 meta:
 *                   type: object
 *                   properties:
 *                     limit: { type: integer, example: 50 }
 *                     offset: { type: integer, example: 0 }
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", requireAuth, async (req, res) => {
    try {
        // If you have auth middleware, use req.user.id. Otherwise accept user_id via query.
        const userId = req.user?.id || req.query.user_id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const status = req.query.status ? String(req.query.status) : null;
        const limit = Math.min(parseInt(req.query.limit ?? "50", 10) || 50, 200);
        const offset = parseInt(req.query.offset ?? "0", 10) || 0;

        // NOTE: Adjust column names if your FK is not vehicle_id or PK is not id.
        const sql = `
      SELECT
        lb.*,
        jsonb_build_object(
          'title', v.title,
          'make', v.make,
          'model', v.model,
          'year', v.year,
          'images', v.images
        ) AS vehicle
      FROM listing_boosts lb
      LEFT JOIN vehicles v ON v.id = lb.vehicle_id
      WHERE lb.user_id = :userId
      ${status ? "AND lb.status = :status" : ""}
      ORDER BY lb.created_at DESC
      LIMIT :limit OFFSET :offset;
    `;

        const data = await sequelize.query(sql, {
            replacements: { userId, status, limit, offset },
            type: sequelize.QueryTypes.SELECT,
        });

        return res.json({
            data,
            meta: { limit, offset },
        });
    } catch (err) {
        console.error("GET /api/listing-boosts error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
