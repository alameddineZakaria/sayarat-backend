const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: Purchase verification and billing records
 */

/**
 * @swagger
 * /api/purchases/verify:
 *   get:
 *     summary: Verify a purchase by transaction ID
 *     description: |
 *       Checks whether a purchase exists for the given transaction/session ID.
 *       Used after payment while waiting for webhook processing.
 *     tags: [Purchases,queries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: transaction_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment provider transaction/session ID
 *     responses:
 *       200:
 *         description: Verification result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 verified:
 *                   type: boolean
 *                   example: true
 *                 purchase:
 *                   type: object
 *                   nullable: true
 *                   additionalProperties: true
 *       400:
 *         description: Missing transaction_id
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Purchase not found yet
 *       500:
 *         description: Server error
 */
router.get("/purchases/verify", /* requireAuth, */ async (req, res) => {
  try {
    const transactionId = String(req.query.transaction_id || "").trim();
    if (!transactionId) {
      return res.status(400).json({ message: "transaction_id is required" });
    }

    const sql = `
      SELECT *
      FROM purchases
      WHERE transaction_id = :transactionId
      LIMIT 1;
    `;

    const rows = await sequelize.query(sql, {
      replacements: { transactionId },
      type: sequelize.QueryTypes.SELECT,
    });

    if (!rows || rows.length === 0) {
      // Webhook might still be processing
      return res.status(404).json({
        verified: false,
        purchase: null,
      });
    }

    return res.json({
      verified: true,
      purchase: rows[0],
    });
  } catch (err) {
    console.error("GET /api/purchases/verify error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
