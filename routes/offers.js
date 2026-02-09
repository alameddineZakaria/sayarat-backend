const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: Offers
 *   description: Offer inbox and offer chat metadata
 */

/**
 * @swagger
 * /api/offers/offers/my:
 *   get:
 *     summary: Get offers for current user (with vehicle, buyer/seller, unread count)
 *     description: |
 *       Returns all offers where the current user is the buyer or seller.
 *       Each offer includes:
 *       - vehicle (id, title, make, model, year, images) with fallback if missing
 *       - buyer (full_name, email) with fallback if missing
 *       - seller (full_name, email) with fallback if missing
 *       - unread_count of unread messages sent by the other party
 *     tags: [Offers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Offers list
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
 *                       vehicle:
 *                         type: object
 *                         nullable: true
 *                       buyer:
 *                         type: object
 *                         nullable: true
 *                       seller:
 *                         type: object
 *                         nullable: true
 *                       unread_count:
 *                         type: integer
 *                         example: 3
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/offers/my", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.query.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const sql = `
      SELECT
        o.*,

        COALESCE(
          jsonb_build_object(
            'id', v.id,
            'title', v.title,
            'make', v.make,
            'model', v.model,
            'year', v.year,
            'images', v.images
          ),
          jsonb_build_object(
            'title', 'Vehicle No Longer Available',
            'make', 'Deleted',
            'model', 'Vehicle',
            'year', NULL,
            'images', '[]'::jsonb
          )
        ) AS vehicle,

        COALESCE(
          jsonb_build_object(
            'id', ub.id,
            'full_name', ub.full_name,
            'email', ub.email
          ),
          jsonb_build_object(
            'full_name', 'Deleted User',
            'email', NULL
          )
        ) AS buyer,

        COALESCE(
          jsonb_build_object(
            'id', us.id,
            'full_name', us.full_name,
            'email', us.email
          ),
          jsonb_build_object(
            'full_name', 'Deleted User',
            'email', NULL
          )
        ) AS seller,

        COALESCE(um.unread_count, 0) AS unread_count

      FROM offers o
      LEFT JOIN vehicles v ON v.id = o.vehicle_id
      LEFT JOIN users ub ON ub.id = o.buyer_id
      LEFT JOIN users us ON us.id = o.seller_id

      LEFT JOIN (
        SELECT
          offer_id,
          COUNT(*)::int AS unread_count
        FROM offer_messages
        WHERE is_read = false
          AND sender_id <> :userId
        GROUP BY offer_id
      ) um ON um.offer_id = o.id

      WHERE o.buyer_id = :userId
         OR o.seller_id = :userId

      ORDER BY o.updated_at DESC;
    `;

    const data = await sequelize.query(sql, {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT,
    });

    return res.json({ data });
  } catch (err) {
    console.error("GET /api/offers/my error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
