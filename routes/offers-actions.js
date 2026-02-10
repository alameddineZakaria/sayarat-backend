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
 * /api/offers-actions/offers/{offerId}/accept:
 *   post:
 *     summary: Accept an offer
 *     description: |
 *       Accepts an offer by updating offer status to `accepted` and inserting an `accept` message.
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
 *                 example: "Offer accepted"
 *               amount:
 *                 type: number
 *                 description: If omitted, server uses COALESCE(counter_amount, offer_amount)
 *                 example: 12000
 *     responses:
 *       200:
 *         description: Offer accepted successfully
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
router.post("/offers/:offerId/accept", requireAuth, async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user?.id || req.body?.user_id; // prefer req.user.id
    if (!userId) {
      await t.rollback();
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { offerId } = req.params;

    // (Optional but recommended) ensure offer exists + user is seller
    // and lock the row to prevent double accepts.
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
        transaction: t,
      }
    );

    const offer = offerRows?.[0];
    if (!offer) {
      await t.rollback();
      return res.status(404).json({ message: "Offer not found" });
    }

    // 권: Usually only seller accepts
    if (String(offer.seller_id) !== String(userId)) {
      await t.rollback();
      return res.status(403).json({ message: "Not allowed to accept this offer" });
    }

    // Prevent accepting twice
    if (offer.status === "accepted") {
      await t.rollback();
      return res.status(409).json({ message: "Offer already accepted" });
    }
    if (offer.status === "rejected") {
      await t.rollback();
      return res.status(409).json({ message: "Offer already rejected" });
    }

    const bodyMessage = String(req.body?.message ?? "Offer accepted");
    const amount =
      req.body?.amount != null
        ? Number(req.body.amount)
        : (offer.counter_amount ?? offer.offer_amount);

    // Update offer
    const updatedOffers = await sequelize.query(
      `
      UPDATE offers
      SET status = 'accepted',
          updated_at = NOW()
      WHERE id = :offerId
      RETURNING *;
      `,
      {
        replacements: { offerId },
        type: sequelize.QueryTypes.SELECT,
        transaction: t,
      }
    );

    const updatedOffer = updatedOffers?.[0];

    // Insert system message (accept)
    const messageRows = await sequelize.query(
      `
      INSERT INTO offer_messages (
        offer_id, sender_id, message, message_type, amount, created_at
      )
      VALUES (
        :offerId, :senderId, :message, 'accept', :amount, NOW()
      )
      RETURNING *;
      `,
      {
        replacements: {
          offerId,
          senderId: userId,
          message: bodyMessage,
          amount,
        },
        type: sequelize.QueryTypes.SELECT,
        transaction: t,
      }
    );

    await t.commit();

    // OPTIONAL: trigger notification outside transaction
    // (call your notification service here using updatedOffer.buyer_id, amount, etc.)
    // Don’t fail the API if notification fails.

    return res.json({
      ok: true,
      offer: updatedOffer,
      messageRow: messageRows?.[0],
    });
  } catch (err) {
    console.error("POST /api/offers/:offerId/accept error:", err);
    try { await t.rollback(); } catch (_) {}
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
