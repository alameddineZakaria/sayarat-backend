const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Vehicle listings
 */

/**
 * @swagger
 * /api/sell/vehicles:
 *   post:
 *     summary: Create a vehicle listing
 *     description: Creates a vehicle listing for the current user.
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [make, model, year, price, mileage, sellerName, sellerPhone]
 *             properties:
 *               title: { type: string, example: "2020 Toyota Corolla" }
 *               make: { type: string, example: "Toyota" }
 *               model: { type: string, example: "Corolla" }
 *               year: { type: integer, example: 2020 }
 *               price: { type: number, example: 12000 }
 *               mileage: { type: integer, example: 85000 }
 *               location: { type: string, example: "Beirut, Beirut" }
 *               body_type: { type: string, example: "Sedan" }
 *               transmission: { type: string, example: "Automatic" }
 *               fuel_type: { type: string, example: "Gasoline" }
 *               condition: { type: string, example: "Used" }
 *               images:
 *                 description: Listing images (jsonb array or text array depending on DB)
 *                 type: array
 *                 items: { type: string }
 *               specs:
 *                 description: Specs object stored as JSONB
 *                 type: object
 *                 additionalProperties: true
 *               features:
 *                 description: Features list (jsonb array or text array)
 *                 type: array
 *                 items: { type: string }
 *               sellerName: { type: string, example: "Ahmad" }
 *               sellerPhone: { type: string, example: "+96170123456" }
 *               sellerEmail: { type: string, nullable: true, example: "a@b.com" }
 *               description: { type: string, nullable: true }
 *     responses:
 *       201:
 *         description: Vehicle created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: { type: boolean, example: true }
 *                 vehicle:
 *                   type: object
 *                   additionalProperties: true
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/vehicles", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // Basic validation (match your client checks)
    const sellerName = String(req.body?.sellerName ?? "").trim();
    const sellerPhone = String(req.body?.sellerPhone ?? "").trim();
    if (!sellerName || !sellerPhone) {
      return res.status(400).json({ message: "sellerName and sellerPhone are required" });
    }

    const make = String(req.body?.make ?? "").trim();
    const model = String(req.body?.model ?? "").trim();
    const year = Number(req.body?.year);
    const price = Number(req.body?.price);
    const mileage = Number(req.body?.mileage);

    if (!make || !model || !Number.isFinite(year) || !Number.isFinite(price) || !Number.isFinite(mileage)) {
      return res.status(400).json({ message: "make, model, year, price, mileage are required" });
    }

    // Server can compute title if not provided
    const title = String(req.body?.title ?? `${year} ${make} ${model}`).trim();

    const payload = {
      user_id: userId,
      title,
      make,
      model,
      year: Math.trunc(year),
      price,
      mileage: Math.trunc(mileage),
      location: req.body?.location ?? "Not specified",
      body_type: req.body?.body_type ?? "Sedan",
      transmission: req.body?.transmission ?? null,
      fuel_type: req.body?.fuel_type ?? null,
      condition: req.body?.condition ?? null,
      images: req.body?.images ?? [],      // jsonb array recommended
      specs: req.body?.specs ?? {},        // jsonb
      features: req.body?.features ?? [],  // jsonb array recommended
      seller_name: sellerName,
      seller_phone: sellerPhone,
      seller_email: req.body?.sellerEmail ?? null,
      description: req.body?.description ?? null,
      status: req.body?.status ?? "active",
    };

    const sql = `
      INSERT INTO vehicles (
        user_id, title, make, model, year, price, mileage, location,
        body_type, transmission, fuel_type, condition,
        images, specs, features,
        seller_name, seller_phone, seller_email, description,
        status, created_at, updated_at
      )
      VALUES (
        :user_id, :title, :make, :model, :year, :price, :mileage, :location,
        :body_type, :transmission, :fuel_type, :condition,
        :images, :specs, :features,
        :seller_name, :seller_phone, :seller_email, :description,
        :status, NOW(), NOW()
      )
      RETURNING *;
    `;

    const rows = await sequelize.query(sql, {
      replacements: payload,
      type: sequelize.QueryTypes.SELECT,
    });

    return res.status(201).json({ ok: true, vehicle: rows?.[0] ?? null });
  } catch (err) {
    console.error("POST /api/vehicles error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
