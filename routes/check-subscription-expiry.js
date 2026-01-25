const express = require('express');
const router = express.Router();
const checkSubscriptionExpiry = require('../jobs/check-subscription-expiry');

/**
 * @swagger
 * /api/subscriptions/check-expiry:
 *   post:
 *     summary: Check subscription expiry, grace period and send notifications
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: Subscription expiry check completed
 */
router.post('/check-expiry', async (req, res) => {
  try {
    const result = await checkSubscriptionExpiry();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
