const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: OfferActions
 *   description: Accept/reject/counter offer actions
 */

/**
 * @swagger
 * /api/handle-reject-offer/offers/{offerId}/reject:
 *   post:
 *     summary: Reject an offer
 *     description: |
 *       Rejects an offer by updating offer status to `rejected` and inserting a `reject` message.
 *       Runs inside a DB transaction.
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
 *                 example: "Offer rejected"
 *     responses:
 *       200:
 *         description: Offer rejected successfully
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
 *         description: Not allowed (must be seller, offer must belong to user)
 *       404:
 *         description: Offer not found
 *       409:
 *         description: Offer already accepted/rejected (state conflict)
 *       500:
 *         description: Server error
 */
router.post("/offers/:offerId/reject", requireAuth, async (req, res) => {
  const trx = await sequelize.transaction();
  try {
    const userId = req.user?.id || req.body?.user_id; // prefer req.user.id
    if (!userId) {
      await trx.rollback();
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { offerId } = req.params;

    // Lock offer row to prevent race conditions
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

    // Usually only seller rejects
    if (String(offer.seller_id) !== String(userId)) {
      await trx.rollback();
      return res.status(403).json({ message: "Not allowed to reject this offer" });
    }

    if (offer.status === "accepted") {
      await trx.rollback();
      return res.status(409).json({ message: "Offer already accepted" });
    }
    if (offer.status === "rejected") {
      await trx.rollback();
      return res.status(409).json({ message: "Offer already rejected" });
    }

    const messageText = String(req.body?.message ?? "Offer rejected");

    // Update offer
    const updatedOffers = await sequelize.query(
      `
      UPDATE offers
      SET status = 'rejected',
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

    // Insert reject message
    const messageRows = await sequelize.query(
      `
      INSERT INTO offer_messages (
        offer_id, sender_id, message, message_type, created_at
      )
      VALUES (
        :offerId, :senderId, :message, 'reject', NOW()
      )
      RETURNING *;
      `,
      {
        replacements: { offerId, senderId: userId, message: messageText },
        type: sequelize.QueryTypes.SELECT,
        transaction: trx,
      }
    );

    await trx.commit();

    // OPTIONAL: notify buyer outside the transaction
    // (call your notification service here using updatedOffer.buyer_id)

    return res.json({
      ok: true,
      offer: updatedOffer,
      messageRow: messageRows?.[0],
    });
  } catch (err) {
    console.error("POST /api/offers/:offerId/reject error:", err);
    try { await trx.rollback(); } catch (_) {}
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
