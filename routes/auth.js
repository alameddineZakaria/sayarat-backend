const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const sequelize = require("../config/db"); // MUST be same instance used by models
const router = express.Router();

const { Users, PublicUsers } = require("../models");

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Create a new user account
 *     description: Creates a user with email/password and returns a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignUpResponse'
 *       400:
 *         description: Validation error (missing/invalid email or password)
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Server error
 */
router.post("/signup", async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { email, password, full_name } = req.body;

        if (!email || !password) {
            await t.rollback();
            return res.status(400).json({
                data: null,
                error: "email and password are required",
            });
        }

        // check in auth.users
        const exists = await Users.findOne({ where: { email }, transaction: t });
        if (exists) {
            await t.rollback();
            return res.status(409).json({
                data: null,
                error: "Email already registered",
            });
        }

        const encrypted_password = await bcrypt.hash(password, 10);

        // 1️⃣ auth.users
        const authUser = await Users.create(
            {
                email,
                encrypted_password,
                aud: "authenticated",
                role: "authenticated",
                raw_user_meta_data: { full_name: full_name || "" },
                created_at: new Date(),
                updated_at: new Date(),
            },
            { transaction: t }
        );

        // 2️⃣ public.users
        await PublicUsers.create(
            {
                id: authUser.id,
                email,
                full_name: full_name || "",
                created_at: new Date(),
                updated_at: new Date(),
            },
            { transaction: t }
        );

        await t.commit();

        return res.status(201).json({
            data: {
                id: authUser.id,
                email,
                full_name: full_name || "",
            },
            error: null,
        });
    } catch (err) {
        await t.rollback();
        return res.status(500).json({
            data: null,
            error: err.message || "Signup failed",
        });
    }
});




module.exports = router;
