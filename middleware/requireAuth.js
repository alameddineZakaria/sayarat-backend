// middleware/requireAuth.js
const jwt = require("jsonwebtoken");

/**
 * JWT auth middleware
 * Expects: Authorization: Bearer <token>
 * Adds: req.user = decoded payload
 */
module.exports = function requireAuth(req, res, next) {
    try {
        const header = req.headers.authorization || req.headers.Authorization;
        if (!header || typeof header !== "string") {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const [scheme, token] = header.split(" ");
        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("JWT_SECRET is not set");
            return res.status(500).json({ message: "Server misconfiguration" });
        }

        // If you want to enforce more checks, do it here (issuer, audience, etc.)
        const decoded = jwt.verify(token, secret);

        // Common shapes: { id }, { userId }, { sub }
        const id = decoded?.id || decoded?.userId || decoded?.sub;
        req.user = { ...decoded, id };

        if (!req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        next();
    } catch (err) {
        // Token expired / invalid signature / malformed
        return res.status(401).json({ message: "Unauthorized" });
    }
};
