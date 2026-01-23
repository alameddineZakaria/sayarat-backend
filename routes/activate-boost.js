// routes/vehicle-boost.js
const express = require('express');
const router = express.Router();
const sequelize = require('../config/db');
/**
 * @swagger
 * /api/activate-boost:
 *   post:
 *     summary: Activate vehicle boost
 *     tags:
 *       - Activate Vehicle Boost
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentIntentId:
 *                 type: string
 *                 example: pi_1234567890
 *               boostType:
 *                 type: string
 *                 enum: [1_day, 3_days, 1_week]
 *                 example: 1_week
 *               vehicleId:
 *                 type: integer
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 example: 1
 *             required: [paymentIntentId, boostType, vehicleId, userId]
 *     responses:
 *       200:
 *         description: Boost activated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 boost:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     boostType:
 *                       type: string
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                     daysRemaining:
 *                       type: integer
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */

const BOOST_DURATIONS = {
  '1_day': 1,
  '3_days': 3,
  '1_week': 7
};

const BOOST_AMOUNTS = {
  '1_day': 5,
  '3_days': 12,
  '1_week': 25
};

// Helper to send JSON with CORS
const jsonResponse = (res, data, status = 200) => res.status(200).json({ ...data, _status: status });

router.post('/', async (req, res) => {
  try {
    const { paymentIntentId, boostType, vehicleId, userId } = req.body;

    if (!paymentIntentId || !boostType || !vehicleId || !userId) {
      return jsonResponse(res, { success: false, error: 'Missing required fields' });
    }

    // Calculate end date
    const days = BOOST_DURATIONS[boostType] || 1;
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    // Insert boost record
    const [boostResult] = await sequelize.query(
      `INSERT INTO listing_boosts
        (vehicle_id, user_id, boost_type, end_date, amount_paid, status, payment_intent_id, impressions, clicks, inquiries)
       VALUES (:vehicleId, :userId, :boostType, :endDate, :amountPaid, 'active', :paymentIntentId, 0, 0, 0)
       RETURNING *`,
      {
        replacements: {
          vehicleId,
          userId,
          boostType,
          endDate: endDate.toISOString(),
          amountPaid: BOOST_AMOUNTS[boostType] || 5,
          paymentIntentId
        },
      }
    );

    const boost = boostResult[0];

    // Update vehicle table to mark as boosted
    await sequelize.query(
      `UPDATE vehicles 
       SET is_boosted = true, boost_end_date = :endDate
       WHERE id = :vehicleId`,
      {
        replacements: {
          endDate: endDate.toISOString(),
          vehicleId
        },
      }
    );

    return jsonResponse(res, {
      success: true,
      boost: {
        id: boost.id,
        boostType,
        endDate: endDate.toISOString(),
        daysRemaining: days
      }
    });

  } catch (error) {
    console.error('Vehicle boost error:', error);
    return jsonResponse(res, { success: false, error: error.message });
  }
});

module.exports = router;
