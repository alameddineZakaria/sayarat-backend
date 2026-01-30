const PHOTO_TAGS = {
    'front': { sortOrder: 1, description: 'Exterior front view' },
    'front-angle': { sortOrder: 2, description: 'Front 3/4 angle view' },
    'side-left': { sortOrder: 3, description: 'Left side profile' },
    'side-right': { sortOrder: 4, description: 'Right side profile' },
    'rear-angle': { sortOrder: 5, description: 'Rear 3/4 angle view' },
    'rear': { sortOrder: 6, description: 'Exterior rear view' },
    'interior-front': { sortOrder: 7, description: 'Front interior/dashboard' },
    'interior-rear': { sortOrder: 8, description: 'Rear seats' },
    'dashboard': { sortOrder: 9, description: 'Dashboard/instrument cluster' },
    'infotainment': { sortOrder: 10, description: 'Infotainment screen' },
    'steering': { sortOrder: 11, description: 'Steering wheel' },
    'seats': { sortOrder: 12, description: 'Seats detail' },
    'trunk': { sortOrder: 13, description: 'Trunk/cargo area' },
    'engine': { sortOrder: 14, description: 'Engine bay' },
    'wheels': { sortOrder: 15, description: 'Wheels/tires' },
    'headlights': { sortOrder: 16, description: 'Headlights detail' },
    'taillights': { sortOrder: 17, description: 'Taillights detail' },
    'badge': { sortOrder: 18, description: 'Brand badge/emblem' },
    'detail': { sortOrder: 19, description: 'Other detail shot' },
    'unknown': { sortOrder: 20, description: 'Unidentified view' }
};



const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};
const APPLE_PRODUCTION_URL =
    "https://buy.itunes.apple.com/verifyReceipt";
const APPLE_SANDBOX_URL =
    "https://sandbox.itunes.apple.com/verifyReceipt";
const APPLE_STATUS = {
    0: "Valid receipt",
    21000: "Invalid JSON",
    21002: "Malformed receipt",
    21003: "Authentication failed",
    21004: "Invalid shared secret",
    21005: "Apple server unavailable",
    21006: "Subscription expired",
    21007: "Sandbox receipt",
    21008: "Production receipt sent to sandbox",
    21010: "Receipt not authorized",
};
module.exports = { PHOTO_TAGS, corsHeaders, APPLE_PRODUCTION_URL, APPLE_SANDBOX_URL, APPLE_STATUS }