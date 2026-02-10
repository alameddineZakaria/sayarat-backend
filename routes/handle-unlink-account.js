const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: Security
 *   description: Account security and linked accounts
 */

/**
 * @swagger
 * /api/handle-unlink-account/security/linked-accounts/{accountId}:
 *   delete:
 *     summary: Unlink a connected account
 *     description: Removes a linked external account (Google, Apple, Facebook, etc.) from the user profile.
 *     tags: [Security]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *         description: Linked account ID
 *     responses:
 *       200:
 *         description: Account unlinked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 accountId:
 *                   type: string
 *                   example: "9a8b7c6d-1111-2222-3333-444455556666"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Linked account not found
 *       500:
 *         description: Server error
 */
router.delete("/security/linked-accounts/:accountId", requireAuth, async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { accountId } = req.params;

    const sql = `
      DELETE FROM linked_accounts
      WHERE id = :accountId
        AND user_id = :userId
      RETURNING id;
    `;

    const rows = await sequelize.query(sql, {
      replacements: { accountId, userId },
      type: sequelize.QueryTypes.SELECT,
    });

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "Linked account not found" });
    }

    return res.json({
      ok: true,
      accountId,
    });
  } catch (err) {
    console.error("DELETE /api/security/linked-accounts/:accountId error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
