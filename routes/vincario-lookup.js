const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { Op } = require("sequelize");
const {
    VinReportPurchases
} = require("../models");

/**
 * Generate SHA1 hash and return first 10 characters
 */
function sha1First10(message) {
    return crypto
        .createHash("sha1")
        .update(message)
        .digest("hex")
        .substring(0, 10);
}

/**
 * @swagger
 * /api/vincario-lookup:
 *   post:
 *     summary: Decode VIN and fetch vehicle report
 *     tags: [vincario-lookup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *             properties:
 *               vin:
 *                 type: string
 *                 example: WBA3A5C50DF123456
 *               action:
 *                 type: string
 *                 enum: [decode, balance]
 *                 example: decode
 *               reportType:
 *                 type: string
 *                 enum: [basic, full]
 *                 example: full
 *               paymentIntentId:
 *                 type: string
 *                 example: null
 *               purchaseId:
 *                 type: string
 *                 example: null
 *     responses:
 *       200:
 *         description: VIN report result
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
router.post("/", async (req, res) => {
    try {
        const {
            vin,
            action = "decode",
            reportType = "full",
            paymentIntentId,
            purchaseId
        } = req.body;

        const apiKey = process.env.VINCARIO_API_KEY;
        const secretKey = process.env.VINCARIO_SECRET_KEY;

        /** ---------------- BALANCE ---------------- */
        if (action === "balance") {
            if (!apiKey || !secretKey) {
                return res.json({
                    success: true,
                    balance: { decode: 0, stolenCheck: 0, marketValue: 0 },
                    message: "Demo mode"
                });
            }

            const controlSum = sha1First10(`balance|${apiKey}|${secretKey}`);
            const url = `https://api.vincario.com/3.2/${apiKey}/${controlSum}/balance.json`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(await response.text());
            }

            const data = await response.json();
            return res.json({ success: true, balance: data.balance || data });
        }

        /** ---------------- VIN VALIDATION ---------------- */
        if (!vin) {
            return res.status(400).json({ success: false, error: "VIN is required" });
        }

        const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
        if (!vinRegex.test(vin)) {
            return res.status(400).json({ success: false, error: "Invalid VIN format" });
        }

        const upperVin = vin.toUpperCase();

        if (!apiKey || !secretKey) {
            return res.json(generateDemoReport(upperVin));
        }

        /** ---------------- DECODE ---------------- */
        const controlSum = sha1First10(
            `${upperVin}|decode|${apiKey}|${secretKey}`
        );

        const decodeUrl = `https://api.vincario.com/3.2/${apiKey}/${controlSum}/decode/${upperVin}.json`;

        const decodeResponse = await fetch(decodeUrl);
        if (!decodeResponse.ok) {
            throw new Error(await decodeResponse.text());
        }

        const decodeData = await decodeResponse.json();
        if (decodeData.error) {
            throw new Error(decodeData.error);
        }

        let report = transformVincarioResponse(decodeData, upperVin);
        report.isPaid = Boolean(paymentIntentId || purchaseId);
        report.purchaseId = purchaseId;

        /** ---------------- FULL REPORT ---------------- */
        if (reportType === "full") {
            // stolen check
            try {
                const stolenSum = sha1First10(
                    `${upperVin}|stolen-check|${apiKey}|${secretKey}`
                );
                const stolenUrl = `https://api.vincario.com/3.2/${apiKey}/${stolenSum}/stolen-check/${upperVin}.json`;
                const stolenRes = await fetch(stolenUrl);
                if (stolenRes.ok) {
                    const stolenData = await stolenRes.json();
                    report.stolenCheck = {
                        isStolen: stolenData.stolen === true || stolenData.stolen === 1,
                        status: stolenData.stolen ? "STOLEN" : "Clear"
                    };
                }
            } catch (_) { }

            // market value
            try {
                const mvSum = sha1First10(
                    `${upperVin}|vehicle-market-value|${apiKey}|${secretKey}`
                );
                const mvUrl = `https://api.vincario.com/3.2/${apiKey}/${mvSum}/vehicle-market-value/${upperVin}.json`;
                const mvRes = await fetch(mvUrl);
                if (mvRes.ok) {
                    const mv = await mvRes.json();
                    if (mv.price_avg) {
                        report.marketValue = {
                            below: mv.price_below,
                            average: mv.price_avg,
                            above: mv.price_above,
                            currency: mv.price_currency || "EUR"
                        };
                    }
                }
            } catch (_) { }
        }

        /** ---------------- SAVE PURCHASE ---------------- */
        if (paymentIntentId || purchaseId) {
            await VinReportPurchases.update(
                {
                    report_data: report,
                    payment_status: "completed",
                    completed_at: new Date()
                },
                {
                    where: purchaseId
                        ? { id: purchaseId }
                        : { payment_intent_id: paymentIntentId }
                }
            );
        }

        return res.json(report);

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});
function transformVincarioResponse(data, vin) {
    let vehicleData = {};

    // Vincario sometimes returns:
    // - { decode: [ { label, value } ] }
    // - [ { label, value } ]
    // - or a flat object
    if (data.decode && Array.isArray(data.decode)) {
        data.decode.forEach(item => {
            if (item.label && item.value !== undefined) {
                vehicleData[item.label] = item.value;
            }
        });
    } else if (Array.isArray(data)) {
        data.forEach(item => {
            if (item.label && item.value !== undefined) {
                vehicleData[item.label] = item.value;
            }
        });
    } else if (typeof data === "object") {
        vehicleData = data;
    }

    /** ---------------- ENGINE DESCRIPTION ---------------- */
    let engineDesc = "";

    if (vehicleData["Engine Displacement (ccm)"]) {
        engineDesc += `${(vehicleData["Engine Displacement (ccm)"] / 1000).toFixed(1)}L `;
    }

    if (vehicleData["Engine Power (HP)"]) {
        engineDesc += `${vehicleData["Engine Power (HP)"]}hp `;
    }

    if (vehicleData["Fuel Type - Primary"]) {
        engineDesc += vehicleData["Fuel Type - Primary"];
    }

    /** ---------------- FINAL RESPONSE ---------------- */
    return {
        success: true,
        vin,

        year: vehicleData["Model Year"]?.toString(),
        make: vehicleData["Make"],
        model: vehicleData["Model"],
        trim: vehicleData["Trim"] || vehicleData["Version"],
        style: vehicleData["Body"],

        engine: engineDesc.trim() || vehicleData["Engine (full)"],
        transmission: vehicleData["Transmission"],
        drivetrain: vehicleData["Drive"],
        fuel: vehicleData["Fuel Type - Primary"],

        specs: {
            powerKw: vehicleData["Engine Power (kW)"],
            powerHp: vehicleData["Engine Power (HP)"],
            displacement: vehicleData["Engine Displacement (ccm)"],
            doors: vehicleData["Number of Doors"],
            seats: parseInt(vehicleData["Number of Seats"], 10) || undefined,
            maxSpeed: vehicleData["Max Speed (km/h)"],
            fuelConsumption: vehicleData["Fuel Consumption Combined (l/100km)"],
            co2Emission: vehicleData["CO2 Emission (g/km)"]
        },

        dimensions: {
            length: vehicleData["Length (mm)"],
            width: vehicleData["Width (mm)"],
            height: vehicleData["Height (mm)"],
            wheelbase: vehicleData["Wheelbase (mm)"]
        },

        manufacturing: {
            manufacturer: vehicleData["Manufacturer"],
            plantCountry: vehicleData["Plant Country"],
            productionYear: vehicleData["Production Started"],
            vehicleType: vehicleData["Product Type"]
        },

        stolenCheck: {
            isStolen: false,
            status: "Not checked"
        }
    };
}

module.exports = transformVincarioResponse;

module.exports = router;
