const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const { Users } = require("../models"); // adjust to your models export

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
    try {
        const { email, password, full_name } = req.body || {};

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required" });
        }
        if (typeof password !== "string" || password.length < 6) {
            return res.status(400).json({ message: "password must be at least 6 characters" });
        }

        // Check existing user
        const existing = await Users.findOne({ where: { email } });
        console.log(existing);
        if (existing) {
            return res.status(409).json({ message: "Email already registered" });
        }

        // Hash password
        const password_hash = await bcrypt.hash(password, 10);

        // Create user
        const user = await Users.create({
            email,
            full_name: full_name || "",
            password_hash,
            provider: "local",
        });

        // Create JWT (optional but typical)
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        return res.status(201).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
            },
        });
    } catch (err) {
        return res.status(500).json({ message: "Failed to sign up" });
    }
});

module.exports = router;
