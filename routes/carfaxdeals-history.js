const express = require('express');
const router = express.Router();

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// CarfaxDeals API configuration
const CARFAXDEALS_API_URL = 'https://api.carfaxdeals.com';
const CARFAXDEALS_API_KEY = process.env.CARFAXDEALS_API_KEY || '';
/**
 * @swagger
 * /api/carfaxdeals-history:
 *   post:
 *     summary: Get vehicle history report (CarfaxDeals)
 *     description: |
 *       Retrieves vehicle history information using CarfaxDeals by VIN.
 *       If the API key is not configured or the external service fails,
 *       a demo response will be returned instead.
 *     tags:
 *       - Vehicle History
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vin
 *             properties:
 *               vin:
 *                 type: string
 *                 description: Vehicle Identification Number (17 characters)
 *                 example: 1HGCM82633A004352
 *               action:
 *                 type: string
 *                 description: Optional action (e.g. check API balance)
 *                 example: balance
 *     responses:
 *       200:
 *         description: Vehicle history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 isDemo:
 *                   type: boolean
 *                   example: false
 *                 vin:
 *                   type: string
 *                   example: 1HGCM82633A004352
 *                 year:
 *                   type: string
 *                   example: "2020"
 *                 make:
 *                   type: string
 *                   example: Toyota
 *                 model:
 *                   type: string
 *                   example: Camry
 *                 trim:
 *                   type: string
 *                   example: XLE
 *                 engine:
 *                   type: string
 *                   example: 2.5L L4
 *                 transmission:
 *                   type: string
 *                   example: Automatic
 *                 drivetrain:
 *                   type: string
 *                   example: FWD
 *                 accidentRecords:
 *                   type: array
 *                   items:
 *                     type: object
 *                   example: []
 *                 ownershipHistory:
 *                   type: array
 *                   items:
 *                     type: object
 *                   example: []
 *                 recallRecords:
 *                   type: array
 *                   items:
 *                     type: object
 *                   example: []
 *                 marketValue:
 *                   type: object
 *                   nullable: true
 *                   example:
 *                     price: 18500
 *                     currency: USD
 *       400:
 *         description: Invalid VIN provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: VIN must be 17 characters
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

// Middleware to apply CORS
router.use((req, res, next) => {
    Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
    });
    next();
});

// ---------- API REQUEST ----------
async function carfaxDealsRequest(vin) {
    const url = `${CARFAXDEALS_API_URL}/vhr/${vin.toUpperCase()}`;

    console.log(`CarfaxDeals API request for VIN: ${vin}`);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-API-Key': CARFAXDEALS_API_KEY,
            'Accept': 'application/json',
        },
    });

    const text = await response.text();

    if (text.trim().startsWith('<')) {
        throw new Error(`CarfaxDeals returned HTML (status ${response.status})`);
    }

    if (!response.ok) {
        throw new Error(`CarfaxDeals API error ${response.status}: ${text.slice(0, 200)}`);
    }

    return JSON.parse(text);
}

// ---------- TRANSFORM ----------
function transformCarfaxDealsResponse(data) {
    const vehicle = data.vehicle || {};
    const history = data.history || {};

    return {
        success: true,
        vin: data.vin || vehicle.vin,
        year: vehicle.year?.toString() || '',
        make: vehicle.make || '',
        model: vehicle.model || '',
        trim: vehicle.trim || '',
        engine: vehicle.engine || '',
        transmission: vehicle.transmission || '',
        drivetrain: vehicle.drivetrain || '',
        accidentRecords: history.accidents || [],
        ownershipHistory: history.owners || [],
        recallRecords: data.recalls || [],
        marketValue: data.marketValue || null,
    };
}

// ---------- DEMO DATA (shortened) ----------
function generateDemoData(vin, reason) {
    return {
        success: true,
        isDemo: true,
        reason,
        vin,
        year: '2020',
        make: 'Demo',
        model: 'Vehicle',
    };
}

// ---------- ROUTE ----------
router.post('/', async (req, res) => {
    try {
        const { vin, action } = req.body;

        if (action === 'balance') {
            return res.json({
                message: 'CarfaxDeals uses per-request pricing',
                configured: !!CARFAXDEALS_API_KEY,
            });
        }

        if (!vin) {
            return res.status(400).json({ error: 'VIN is required' });
        }

        const cleanVin = vin.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');
        if (cleanVin.length !== 17) {
            return res.status(400).json({ error: 'VIN must be 17 characters' });
        }

        if (!CARFAXDEALS_API_KEY) {
            return res.json(generateDemoData(cleanVin, 'API key not configured'));
        }

        try {
            const apiData = await carfaxDealsRequest(cleanVin);
            const report = transformCarfaxDealsResponse(apiData);
            return res.json(report);
        } catch (apiErr) {
            console.error(apiErr.message);
            return res.json(generateDemoData(cleanVin, apiErr.message));
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
