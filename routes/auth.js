const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sequelize = require("../config/db"); // your Sequelize instance

const router = express.Router();
const { Users, PublicUsers } = require("../models"); // adjust to your models export

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SignUpRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: user@example.com
 *         password:
 *           type: string
 *           example: "P@ssw0rd123"
 *         full_name:
 *           type: string
 *           example: "Zakaria Alameddine"
 *     SignUpResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT access token
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *             email:
 *               type: string
 *               example: "user@example.com"
 *             full_name:
 *               type: string
 *               example: "Zakaria Alameddine"
 */

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

        const encrypted_password = await bcrypt.hash(password, 10);

        // 1️⃣ auth.users
        await Users.create({
            email,
            encrypted_password,
            aud: "authenticated",
            role: "authenticated",
            created_at: new Date(),
            updated_at: new Date(),
        }, { transaction: t });

        // 2️⃣ public.users
        await PublicUsers.create({
            email,
            full_name: full_name || "",
            created_at: new Date(),
            updated_at: new Date(),
        }, { transaction: t });

        await t.commit();
        return res.status(201).json({ email });
    } catch (err) {
        await t.rollback();
        return res.status(500).json({ message: "Signup failed" });
    }
});

module.exports = router;
