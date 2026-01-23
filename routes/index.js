const express = require('express');
const router = express.Router();

// Import your route modules
router.use('/send-otp-sms', require('./sent-otp-sms'));
router.use('/activate-boost', require('./activate-boost'));
router.use('/admin-analytics', require('./admin-analytics'));
router.use('/admin-clear-chat', require('./admin-clear-chat'));
router.use('/function', require('./generic-query-runner'));
router.use('/admin-messages', require('./admin-messages'));
router.use('/ai-analyze-vehicle', require('./ai-analyze-vehicle'));
router.use('/photo-tagger', require('./photo-tagger'));
router.use('/vin/decode', require('./auto-dev-vin-decode'));
router.use('/carfaxdeals-history', require('./carfaxdeals-history'));
router.use('/carsxe', require('./carsxe-history'));
router.use('/check-expiring', require('./check-expiring-offers'));
module.exports = router;
