const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const { Users, PublicUsers } = require("../models");

/**
 * @swagger
 * /api/signin/signin:
 *   post:
 *     summary: Sign in with email/password
 *     description: Verifies credentials and returns a JWT token + user data.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: "zakaria@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Signed in successfully
 *       400:
 *         description: Missing email/password
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        data: null,
        error: "email and password are required",
      });
    }

    // 1) Find user in auth.users
    const user = await Users.findOne({ where: { email } });
    console.log(user)

    // Don't reveal if email exists or not
    if (!user || !user.encrypted_password) {
      return res.status(401).json({
        data: null,
        error: "Invalid email or password",
      });
    }

    // 2) Verify password
    const ok = await bcrypt.compare(password, user.encrypted_password);
    if (!ok) {
      return res.status(401).json({
        data: null,
        error: "Invalid email or password",
      });
    }

    // 3) Optionally load public profile (full_name, etc.)
    const publicUser = await PublicUsers.findOne({ where: { id: user.id } });

    // 4) Issue JWT
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role || "authenticated",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      data: {
        user: {
          id: user.id,
          email: user.email,
          full_name: publicUser?.full_name || user.raw_user_meta_data?.full_name || "",
          role: user.role || "authenticated",
        },
        access_token: token,
        token_type: "bearer",
        expires_in: 60 * 60 * 24 * 7, // 7 days (seconds)
      },
      error: null,
    });
  } catch (err) {
    return res.status(500).json({
      data: null,
      error: err.message || "Signin failed",
    });
  }
});

module.exports = router;
