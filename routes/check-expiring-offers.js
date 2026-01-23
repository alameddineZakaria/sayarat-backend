const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const sequelize = require("../config/db"); // your sequelize instance
const { Offers, Users, PushTokens, OfferNotifications,Vehicles } = require("../models");
const cors = require('cors');

// Middleware to parse JSON
router.use(cors());
router.use(express.json());


/**
 * @swagger
 * /api/check-expiring:
 *   post:
 *     summary: Check and notify about expiring and expired offers
 *     description: |
 *       Finds offers that are expiring within 24 hours and offers that have already expired.
 *       Sends push notifications, emails, and in-app notifications to buyers and sellers.
 *       Updates offer statuses (marks reminders sent or sets expired) in the database.
 *     tags:
 *       - Check expiring offers
 *     responses:
 *       200:
 *         description: Successfully processed expiring and expired offers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-01-23T15:30:00.000Z"
 *                 remindersCount:
 *                   type: integer
 *                   example: 3
 *                 expiredCount:
 *                   type: integer
 *                   example: 2
 *                 reminders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       offerId:
 *                         type: integer
 *                         example: 101
 *                       hoursLeft:
 *                         type: integer
 *                         example: 12
 *                       buyerPush:
 *                         type: integer
 *                         example: 1
 *                       sellerPush:
 *                         type: integer
 *                         example: 1
 *                       buyerEmail:
 *                         type: boolean
 *                         example: true
 *                       sellerEmail:
 *                         type: boolean
 *                         example: true
 *                 expired:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       offerId:
 *                         type: integer
 *                         example: 99
 *                       previousStatus:
 *                         type: string
 *                         example: "pending"
 *                       buyerPush:
 *                         type: integer
 *                         example: 1
 *                       sellerPush:
 *                         type: integer
 *                         example: 1
 *       500:
 *         description: Server error while processing offers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */


router.post("/", async (req, res) => {
  try {
    const now = new Date();
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // ---------------- EXPIRING OFFERS ----------------
    const expiringOffers = await Offers.findAll({
      where: {
        status: { [Op.in]: ["pending", "countered"] },
        expires_at: { [Op.gt]: now, [Op.lte]: in24Hours },
        expiry_reminder_sent: false,
      },
      include: [Users, Vehicles], // include buyer, seller and vehicle info if associations exist
    });

    const reminderResults = [];

    for (const offer of expiringOffers) {
      const amount = offer.counter_amount || offer.offer_amount || 0;
      const hoursLeft = Math.round((offer.expires_at - now) / (1000 * 60 * 60));
      const vehicleTitle = offer.Vehicle
        ? offer.Vehicle.title || `${offer.Vehicle.year} ${offer.Vehicle.make} ${offer.Vehicle.model}`
        : "your vehicle";

      const buyerTitle = "Offer Expiring Soon!";
      const buyerBody = `Your offer of $${amount.toLocaleString()} on ${vehicleTitle} expires in ${hoursLeft} hours.`;
      const sellerTitle = "Action Required: Offer Expiring!";
      const sellerBody = `An offer of $${amount.toLocaleString()} on ${vehicleTitle} expires in ${hoursLeft} hours.`;

      // Push notifications
      const buyerPush = await sendPush(offer.buyer_id, buyerTitle, buyerBody, offer.id);
      const sellerPush = offer.status === "pending"
        ? await sendPush(offer.seller_id, sellerTitle, sellerBody, offer.id)
        : { sent: 0 };

      // Email notifications
      const buyerEmail = await sendEmail(offer.buyer_id, buyerTitle, buyerBody);
      const sellerEmail = offer.status === "pending"
        ? await sendEmail(offer.seller_id, sellerTitle, sellerBody)
        : { sent: false };

      // In-app notifications
      await createInAppNotification(offer.buyer_id, offer.id, buyerTitle, buyerBody, amount);
      if (offer.status === "pending") {
        await createInAppNotification(offer.seller_id, offer.id, sellerTitle, sellerBody, amount);
      }

      // Mark reminder as sent
      await offer.update({ expiry_reminder_sent: true });

      reminderResults.push({
        offerId: offer.id,
        hoursLeft,
        buyerPush: buyerPush.sent,
        sellerPush: sellerPush.sent,
        buyerEmail: buyerEmail.sent,
        sellerEmail: sellerEmail.sent,
      });
    }

    // ---------------- EXPIRED OFFERS ----------------
    const expiredOffers = await Offers.findAll({
      where: {
        status: { [Op.in]: ["pending", "countered"] },
        expires_at: { [Op.lt]: now },
        expired_notification_sent: false,
      },
      include: [User, Vehicle],
    });

    const expiredResults = [];

    for (const offer of expiredOffers) {
      const amount = offer.counter_amount || offer.offer_amount || 0;
      const vehicleTitle = offer.Vehicle
        ? offer.Vehicle.title || `${offer.Vehicle.year} ${offer.Vehicle.make} ${offer.Vehicle.model}`
        : "the vehicle";

      // Update offer status
      await offer.update({ status: "expired", expired_notification_sent: true, updated_at: now });

      const buyerTitle = "Offer Expired";
      const buyerBody = `Your offer of $${amount.toLocaleString()} on ${vehicleTitle} has expired.`;
      const sellerTitle = "Offer Expired";
      const sellerBody = `An offer of $${amount.toLocaleString()} on ${vehicleTitle} has expired.`;

      const buyerPush = await sendPush(offer.buyer_id, buyerTitle, buyerBody, offer.id);
      const sellerPush = await sendPush(offer.seller_id, sellerTitle, sellerBody, offer.id);

      await sendEmail(offer.buyer_id, buyerTitle, buyerBody);
      await sendEmail(offer.seller_id, sellerTitle, sellerBody);

      await createInAppNotification(offer.buyer_id, offer.id, buyerTitle, buyerBody, amount);
      await createInAppNotification(offer.seller_id, offer.id, sellerTitle, sellerBody, amount);

      expiredResults.push({
        offerId: offer.id,
        previousStatus: offer.status,
        buyerPush: buyerPush.sent,
        sellerPush: sellerPush.sent,
      });
    }

    res.json({
      success: true,
      timestamp: now.toISOString(),
      remindersCount: reminderResults.length,
      expiredCount: expiredResults.length,
      reminders: reminderResults,
      expired: expiredResults,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message || "Server error" });
  }
});

// ---------------- HELPERS ----------------
// Implement sendPush, sendEmail, createInAppNotification with Sequelize queries if needed
async function sendPush(userId, title, body, offerId) {
  // Get tokens from PushToken table
  const tokens = await PushTokens.findAll({ where: { user_id: userId, is_active: true } });
  if (!tokens.length) return { sent: 0 };

  const messages = tokens.map(t => ({
    to: t.token,
    sound: "default",
    title,
    body,
    data: { offerId },
    priority: "high",
  }));

  const pushRes = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(messages),
  });

  if (!pushRes.ok) return { sent: 0 };
  const result = await pushRes.json();
  return { sent: result.data?.filter(r => r.status === "ok").length || 0 };
}
async function sendEmail(userId, subject, body) {
  const user = await User.findByPk(userId);
  if (!user?.email) return { sent: false };

  const sendgridKey = process.env.SENDGRID_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!sendgridKey || !from) return { sent: false };

  const emailRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sendgridKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: user.email, name: user.full_name || "User" }] }],
      from: { email: from, name: "AutoMarket" },
      subject,
      content: [{ type: "text/plain", value: body }],
    }),
  });

  return { sent: emailRes.ok };
}

async function createInAppNotification(userId, offerId, title, body, amount) {
  await OfferNotifications.create({
    user_id: userId,
    offer_id: offerId,
    title,
    body,
    amount,
    is_read: false,
  });
}

module.exports = router;
