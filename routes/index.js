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
router.use('/check-saved-search-matches', require('./check-saved-search-matches'));
router.use('/vincario-lookup', require('./vincario-lookup'));
router.use('/vin-audit-lookup', require('./vinaudit-lookup'));
router.use('/verify-google-purchase', require('./verify-google-purchase'));
router.use('/verify-apple-receipt', require('./verify-apple-receipt'));

// Converted from Supabase Edge Functions (.txt)
router.use('/create-boost-payment', require('./create-boost-payment'));
router.use('/create-vin-report-payment', require('./create-vin-report-payment'));
router.use('/create-subscription', require('./create-subscription'));
router.use('/create-stripe-checkout', require('./create-stripe-checkout'));
router.use('/stripe-webhook', require('./stripe-webhook'));
router.use('/process-refund', require('./process-refund'));
router.use('/process-price-drop', require('./process-price-drop'));
router.use('/send-push-notification', require('./send-push-notification'));
router.use('/send-message-notification', require('./send-message-notification'));
router.use('/send-offer-notification', require('./send-offer-notification'));
router.use('/send-sms-notification', require('./send-sms-notification'));
router.use('/send-email-receipt', require('./send-email-receipt'));
router.use('/send-email-digest', require('./send-email-digest'));
router.use('/send-saved-search-digest', require('./send-saved-search-digest'));
router.use('/update-saved-search-counts', require('./update-saved-search-counts'));
router.use('/upload-media-v2', require('./upload-media-v2'));
router.use('/upload-chat-media', require('./upload-chat-media'));
router.use('/generate-video-thumbnail', require('./generate-video-thumbnail'));
router.use('/submit-contact-form', require('./submit-contact-form'));
module.exports = router;
