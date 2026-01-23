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

module.exports = router;
