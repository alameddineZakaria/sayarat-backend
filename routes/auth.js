const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const sequelize = require("../config/db");
const router = express.Router();

const { Users, PublicUsers, Sessions, RefreshTokens, UserSessions } = require("../models");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const JWT_EXPIRES_IN_SECONDS = Number(process.env.JWT_EXPIRES_IN_SECONDS || 3600);

function buildUserResponse(authUser, full_name) {
    const createdAt = authUser.created_at ? new Date(authUser.created_at).toISOString() : new Date().toISOString();
    const updatedAt = authUser.updated_at ? new Date(authUser.updated_at).toISOString() : new Date().toISOString();

    return {
        id: authUser.id,
        app_metadata: { provider: "email", providers: ["email"] },
        user_metadata: { full_name: full_name || "" },
        aud: authUser.aud || "authenticated",
        email: authUser.email,
        created_at: createdAt,
        role: authUser.role || "authenticated",
        updated_at: updatedAt,
    };
}
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

        if (!email || !password) {
            await t.rollback();
            return res.status(400).json({ data: null, error: "email and password are required" });
        }

        const exists = await Users.findOne({ where: { email }, transaction: t });
        if (exists) {
            await t.rollback();
            return res.status(409).json({ data: null, error: "Email already registered" });
        }

        const encrypted_password = await bcrypt.hash(password, 10);

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

        // ✅ access token
        const access_token = jwt.sign(
            {
                sub: authUser.id,
                email: authUser.email,
                role: authUser.role || "authenticated",
                aud: authUser.aud || "authenticated",
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN_SECONDS }
        );

        // ✅ refresh token
        const refresh_token = crypto.randomUUID();

        // ✅ create auth.sessions row (so refresh_tokens.session_id FK is satisfied)
        const session_id = crypto.randomUUID();
        const now = new Date();

        await Sessions.create(
            {
                id: session_id,
                user_id: authUser.id,
                created_at: now,
                updated_at: now,
                // optional: aal, user_agent, ip, etc.
                aal: "aal1",
                user_agent: req.get("user-agent") || null,
                ip: req.ip || null,
            },
            { transaction: t }
        );

        // ✅ create auth.refresh_tokens row linked to session
        await RefreshTokens.create(
            {
                token: refresh_token,
                user_id: String(authUser.id), // your column is STRING(255)
                revoked: false,
                created_at: now,
                updated_at: now,
                parent: null,
                session_id, // ✅ FK now valid
            },
            { transaction: t }
        );

        // (Optional) also track device/session in your own table (public.user_sessions)
        // If you want it:
        await UserSessions.create(
            {
                user_id: authUser.id,
                session_token: refresh_token, // or access_token, your choice
                is_current: true,
                ip_address: req.ip || null,
            },
            { transaction: t }
        );

        const expires_in = JWT_EXPIRES_IN_SECONDS;
        const expires_at = Math.floor(Date.now() / 1000) + expires_in;

        const user = buildUserResponse(authUser, full_name);

        const session = {
            provider_token: null,
            provider_refresh_token: null,
            access_token,
            refresh_token,
            expires_in,
            expires_at,
            token_type: "bearer",
            user,
        };

        await t.commit();

        return res.status(201).json({
            data: { user, session },
            error: null,
        });
    } catch (err) {
        await t.rollback();
        return res.status(500).json({ data: null, error: err.message || "Signup failed" });
    }
});

module.exports = router;
