/**
 * @swagger
 * tags:
 *   name: CarsXE
 *   description: Vehicle history reports via CarsXE
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());

/**
 * @swagger
 * /api/carsxe/history:
 *   post:
 *     summary: Get vehicle history report by VIN
 *     tags: [CarsXE]
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
 *                 example: 1HGCM82633A004352
 *               userId:
 *                 type: string
 *               paymentIntentId:
 *                 type: string
 *               purchaseId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vehicle history report
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
router.post('/history', async (req, res) => {
  try {
    const { vin, userId, paymentIntentId, purchaseId } = req.body;
    const apiKey = process.env.CARSXE_API_KEY;

    console.log(`=== CarsXE History API ===`);
    console.log(`VIN: ${vin}`);
    console.log(`API Key configured: ${apiKey ? 'Yes' : 'No'}`);

    if (!vin) {
      return res.status(400).json({ success: false, error: 'VIN is required' });
    }

    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
    if (!vinRegex.test(vin)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid VIN format. VIN must be 17 characters.'
      });
    }

    // Demo mode
    if (!apiKey) {
      console.log('No API key – returning demo data');
      return res.json(generateDemoReport(vin));
    }

    const upperVin = vin.toUpperCase();
    const url = `https://api.carsxe.com/history?key=${apiKey}&vin=${upperVin}`;

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'VehicleMarketplace/1.0'
      }
    });

    const text = await response.text();
    console.log(`CarsXE status: ${response.status}`);
    console.log(text.substring(0, 1000));

    if (!response.ok) {
      if ([401, 403].includes(response.status)) {
        throw new Error('Invalid API key or unauthorized');
      }
      throw new Error(`CarsXE error ${response.status}`);
    }

    const data = JSON.parse(text);

    if (!data.success) {
      throw new Error('Failed to retrieve vehicle history');
    }

    const report = transformCarsXEResponse(data, upperVin);
    report.isPaid = !!paymentIntentId;
    report.purchaseId = purchaseId;

    return res.json(report);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Server error'
    });
  }
});

module.exports = router;

/* ---------------- HELPERS ---------------- */

function transformCarsXEResponse(data, vin) {
  const report = {
    success: true,
    vin,
    stolenCheck: { isStolen: false, status: 'Clear' }
  };

  if (Array.isArray(data.junkAndSalvageInformation)) {
    report.salvageRecords = data.junkAndSalvageInformation.map(item => ({
      date: item.VehicleObtainedDate
        ? new Date(item.VehicleObtainedDate).toLocaleDateString()
        : 'Unknown',
      state: item.ReportingEntityAbstract?.LocationStateUSPostalServiceCode || 'Unknown',
      type: item.VehicleDispositionText || 'Unknown',
      entity: item.ReportingEntityAbstract?.EntityName || 'Unknown',
      disposition: item.VehicleDispositionText
    }));
  }

  if (Array.isArray(data.insuranceInformation)) {
    report.insuranceRecords = data.insuranceInformation.map(item => ({
      date: item.VehicleObtainedDate
        ? new Date(item.VehicleObtainedDate).toLocaleDateString()
        : 'Unknown',
      company: item.ReportingEntityAbstract?.EntityName || 'Unknown',
      location: `${item.ReportingEntityAbstract?.LocationCityName || ''}, ${item.ReportingEntityAbstract?.LocationStateUSPostalServiceCode || ''}`.trim()
    }));
  }

  if (Array.isArray(data.brandsInformation)) {
    report.brandRecords = data.brandsInformation
      .filter(b => b.record)
      .map(b => ({
        code: b.code,
        name: b.name,
        description: b.description,
        date: b.record?.VehicleBrandDate?.Date
          ? new Date(b.record.VehicleBrandDate.Date).toLocaleDateString()
          : undefined,
        state: b.record?.ReportingEntityAbstract?.EntityName
      }));
  }

  report.rawResponse = {
    vinChanged: data.vinChanged,
    status: data.status
  };

  return report;
}

function generateDemoReport(vin) {
  return {
    success: true,
    vin,
    year: '2022',
    make: 'Toyota',
    model: 'Camry',
    trim: 'SE',
    engine: '2.5L Gasoline',
    transmission: 'Automatic',
    drivetrain: 'FWD',
    stolenCheck: { isStolen: false, status: 'Clear' },
    marketValue: { below: 18000, average: 22000, above: 26000, currency: 'USD' }
  };
}
