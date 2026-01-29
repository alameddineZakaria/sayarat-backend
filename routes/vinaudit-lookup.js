const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const axios = require("axios");
const { Op } = require("sequelize");

const { VinReportPurchases } = require("../models");

/**
 * @swagger
 * /api/vin-audit-lookup:
 *   post:
 *     summary: Get VIN audit report
 *     tags: [VIN Audit]
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
 *               reportType:
 *                 type: string
 *                 example: "full"
 *     responses:
 *       200:
 *         description: VIN report retrieved successfully
 *       400:
 *         description: Invalid input or API error
 */
router.post("/", async (req, res) => {
    try {
        const { vin, reportType = "full" } = req.body;

        if (!vin) {
            return res.status(400).json({
                success: false,
                error: "VIN is required",
            });
        }

        // VIN validation
        const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
        if (!vinRegex.test(vin)) {
            return res.status(400).json({
                success: false,
                error:
                    "Invalid VIN format. VIN must be 17 characters (excluding I, O, Q)",
            });
        }

        const apiKey = process.env.VINAUDIT_API_KEY;

        // Generate unique report ID
        const reportId = crypto.randomUUID();

        let report;

        // Demo mode if no API key
        if (!apiKey) {
            report = generateDemoReport(vin);
        } else {
            const apiUrl = `https://api.vinaudit.com/v2/pullreport?id=${reportId}&key=${apiKey}&vin=${vin}&format=json`;

            const response = await axios.get(apiUrl, {
                headers: { Accept: "application/json" },
            });

            report = transformVINAuditResponse(response.data, vin);
            console.log(report);
        }

        // Optional: save purchase/report log
        await VinReportPurchases.create({
            vin,
            report_type: reportType,
            provider: "vinaudit",
            success: report.success,
            raw_response: report,
            amount: 0
        });

        return res.json(report);
    } catch (error) {
        console.error("VINAudit lookup error:", error);

        return res.status(400).json({
            success: false,
            error: error.message || "VIN audit failed",
        });
    }
});
function transformVINAuditResponse(data, vin) {
    return {
        success: true,
        vin,
        year: data.attributes?.year || data.year,
        make: data.attributes?.make || data.make,
        model: data.attributes?.model || data.model,
        trim: data.attributes?.trim || data.trim,
        style: data.attributes?.style || data.body,
        engine: data.attributes?.engine || data.engine,
        transmission: data.attributes?.transmission || data.transmission,
        drivetrain: data.attributes?.drivetrain || data.drivetrain,
        fuel: data.attributes?.fuel || data.fuel,

        titleRecords: data.titles?.map(t => ({
            date: t.date,
            state: t.state,
            odometer: t.odometer,
            titleType: t.title_type,
            brand: t.brand,
        })) || [],

        accidentRecords: data.accidents?.map(a => ({
            date: a.date,
            location: a.location,
            description: a.description,
            severity: a.severity,
        })) || [],

        salvageRecords: data.salvage?.map(s => ({
            date: s.date,
            state: s.state,
            type: s.type,
        })) || [],

        theftRecords: data.theft?.map(t => ({
            date: t.date,
            location: t.location,
            status: t.status,
        })) || [],

        recallRecords: data.recalls?.map(r => ({
            date: r.date,
            component: r.component,
            description: r.description,
            remedy: r.remedy,
        })) || [],

        ownershipHistory: data.owners?.map(o => ({
            purchaseDate: o.purchase_date,
            location: o.location,
            ownerType: o.owner_type,
        })) || [],

        saleRecords: data.sales?.map(s => ({
            date: s.date,
            price: s.price,
            odometer: s.odometer,
            condition: s.condition,
        })) || [],

        lienRecords: data.liens?.map(l => ({
            date: l.date,
            lienHolder: l.lien_holder,
            status: l.status,
        })) || [],

        marketValue: data.market_value
            ? {
                below: data.market_value.below,
                average: data.market_value.average,
                above: data.market_value.above,
            }
            : undefined,
    };
}
function generateDemoReport(vin) {
    const year = 2020 + (parseInt(vin.charAt(9), 36) % 5);
    const makes = ["Toyota", "Honda", "Ford", "BMW", "Mercedes-Benz"];
    const models = {
        Toyota: ["Camry", "Corolla", "RAV4"],
        Honda: ["Accord", "Civic", "CR-V"],
        Ford: ["F-150", "Mustang", "Explorer"],
        BMW: ["3 Series", "5 Series"],
        "Mercedes-Benz": ["C-Class", "E-Class"],
    };

    const make = makes[parseInt(vin.charAt(1), 36) % makes.length];
    const model =
        models[make][parseInt(vin.charAt(2), 36) % models[make].length];

    return {
        success: true,
        vin,
        year: year.toString(),
        make,
        model,
        trim: "SE",
        style: "Sedan",
        engine: "2.5L 4-Cylinder",
        transmission: "Automatic",
        drivetrain: "FWD",
        fuel: "Gasoline",
        titleRecords: [],
        accidentRecords: [],
        salvageRecords: [],
        theftRecords: [],
        recallRecords: [],
        ownershipHistory: [],
        saleRecords: [],
        lienRecords: [],
        marketValue: {
            below: 18000,
            average: 22000,
            above: 26000,
        },
    };
}

module.exports = router;
