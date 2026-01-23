const express = require('express');
const router = express.Router();
const sequelize = require('../config/db'); // available if you want DB later
const fetch = require('node-fetch');

// Safe fetch wrapper for CommonJS (node-fetch v3+)
// const fetch = (...args) =>
//   import('node-fetch').then(({ default: fetch }) => fetch(...args));

/**
 * @swagger
 * /api/vin/decode:
 *   post:
 *     summary: Decode VIN and return vehicle details
 *     tags:
 *       - VIN
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
 *                 example: "1HGCM82633A004352"
 *     responses:
 *       200:
 *         description: VIN decoded successfully
 *       400:
 *         description: Invalid VIN
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
  try {
    const { vin } = req.body;

    if (!vin || typeof vin !== 'string') {
      return res.status(400).json({ error: 'VIN is required' });
    }

    const cleanVin = vin.trim().toUpperCase();

    if (cleanVin.length !== 17) {
      return res.status(400).json({ error: 'VIN must be exactly 17 characters' });
    }

    if (/[IOQ]/i.test(cleanVin)) {
      return res.status(400).json({ error: 'VIN cannot contain letters I, O, or Q' });
    }

    const apiKey = process.env.AUTO_DEV_API_KEY;
    if (!apiKey) {
      console.error('AUTO_DEV_API_KEY not configured');
      return res.status(500).json({ error: 'VIN decode service not configured' });
    }

    const apiUrl = `https://api.auto.dev/vin/${cleanVin}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const responseText = await response.text();

    if (!response.ok) {
      let errorMessage = 'Failed to decode VIN';
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {}

      return res.status(response.status).json({
        error: errorMessage,
        status: response.status,
      });
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      return res.status(500).json({ error: 'Invalid response from VIN service' });
    }

    if (data.vinValid === false) {
      return res.status(400).json({ error: 'Invalid VIN number', vinValid: false });
    }

    // Mappings
    const bodyTypeMapping = {
      Sedan: 'Sedan',
      SUV: 'SUV',
      Truck: 'Pickup',
      Pickup: 'Pickup',
      Coupe: 'Coupe',
      Convertible: 'Convertible',
      Hatchback: 'Hatchback',
      Wagon: 'Wagon',
      Van: 'Van',
      Minivan: 'Van',
      Crossover: 'SUV',
    };

    const transmissionMapping = {
      Automatic: 'Automatic',
      Manual: 'Manual',
      CVT: 'Automatic',
      'Automated Manual': 'Automatic',
      'Direct Drive': 'Automatic',
    };

    const driveMapping = {
      FWD: 'FWD',
      RWD: 'RWD',
      AWD: 'AWD',
      '4WD': '4WD',
      '4x4': '4WD',
      '4X4': '4WD',
      'Front-Wheel Drive': 'FWD',
      'Rear-Wheel Drive': 'RWD',
      'All-Wheel Drive': 'AWD',
      'Four-Wheel Drive': '4WD',
    };

    const vehicleData = {
      vin: cleanVin,
      vinValid: data.vinValid,
      make: data.make || '',
      model: data.model || '',
      year: data.vehicle?.year?.toString() || '',
      trim: data.trim || '',
      style: data.style || '',
      bodyType: bodyTypeMapping[data.body] || data.body || '',
      engine: data.engine || '',
      transmission:
        transmissionMapping[data.transmission] ||
        data.transmission ||
        'Automatic',
      drivetrain: driveMapping[data.drive] || data.drive || '',
      manufacturer: data.vehicle?.manufacturer || '',
      origin: data.origin || '',
      raw: {
        wmi: data.wmi,
        squishVin: data.squishVin,
        checkDigit: data.checkDigit,
        checksum: data.checksum,
        type: data.type,
        ambiguous: data.ambiguous,
      },
    };

    return res.json({
      success: true,
      data: vehicleData,
    });

  } catch (error) {
    console.error('VIN decode error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
