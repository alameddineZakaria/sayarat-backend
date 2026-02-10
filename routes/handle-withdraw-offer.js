const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: OfferActions
 *   description: Accept, reject, withdraw offer actions
 */

/**
 * @swagger
 * /api/handle-withdraw-offer/offers/{offerId}/withdraw:
 *   post:
 *     summary: Withdraw an offer
 *     description: |
 *       Withdraws an offer by updating its status to `withdrawn`
 *       and inserting a system message. Runs inside a DB transaction.
 *     tags: [OfferActions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: offerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Offer ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Offer withdrawn"
 *     responses:
 *       200:
 *         description: Offer withdrawn successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: { type: boolean, example: true }
 *                 offer:
 *                   type: object
 *                   additionalProperties: true
 *                 messageRow:
 *                   type: object
 *                   additionalProperties: true
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not allowed (must be buyer)
 *       404:
 *         description: Offer not found
 *       409:
 *         description: Offer already finalized
 *       500:
 *         description: Server error
 */
router.post("/offers/:offerId/withdraw", requireAuth, async (req, res) => {
  const trx = await sequelize.transaction();
  try {
    const userId = req.user?.id || req.body?.user_id;
    if (!userId) {
      await trx.rollback();
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { offerId } = req.params;

    // Lock offer row
    const offerRows = await sequelize.query(
      `
      SELECT *
      FROM offers
      WHERE id = :offerId
      FOR UPDATE
      `,
      {
        replacements: { offerId },
        type: sequelize.QueryTypes.SELECT,
        transaction: trx,
      }
    );

    const offer = offerRows?.[0];
    if (!offer) {
      await trx.rollback();
      return res.status(404).json({ message: "Offer not found" });
    }

    // Only buyer can withdraw
    if (String(offer.buyer_id) !== String(userId)) {
      await trx.rollback();
      return res.status(403).json({ message: "Not allowed to withdraw this offer" });
    }

    // Prevent invalid transitions
    if (["accepted", "rejected", "withdrawn"].includes(offer.status)) {
      await trx.rollback();
      return res.status(409).json({ message: `Offer already ${offer.status}` });
    }

    const messageText = String(req.body?.message ?? "Offer withdrawn");

    // Update offer
    const updatedOffers = await sequelize.query(
      `
      UPDATE offers
      SET status = 'withdrawn',
          updated_at = NOW()
      WHERE id = :offerId
      RETURNING *;
      `,
      {
        replacements: { offerId },
        type: sequelize.QueryTypes.SELECT,
        transaction: trx,
      }
    );

    const updatedOffer = updatedOffers?.[0];

    // Insert system message
    const messageRows = await sequelize.query(
      `
      INSERT INTO offer_messages (
        offer_id, sender_id, message, message_type, created_at
      )
      VALUES (
        :offerId, :senderId, :message, 'system', NOW()
      )
      RETURNING *;
      `,
      {
        replacements: {
          offerId,
          senderId: userId,
          message: messageText,
        },
        type: sequelize.QueryTypes.SELECT,
        transaction: trx,
      }
    );

    await trx.commit();

    // OPTIONAL: trigger notification to seller outside transaction
    // (use updatedOffer.seller_id)

    return res.json({
      ok: true,
      offer: updatedOffer,
      messageRow: messageRows?.[0],
    });
  } catch (err) {
    console.error("POST /api/offers/:offerId/withdraw error:", err);
    try { await trx.rollback(); } catch (_) { }
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
