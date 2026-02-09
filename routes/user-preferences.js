const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: UserPreferences
 *   description: User notification and app preferences
 */

/**
 * @swagger
 * /api/user-preferences/user/preferences:
 *   get:
 *     summary: Get current user's preferences
 *     description: Returns the user's preferences. If some fields are NULL, defaults are applied.
 *     tags: [UserPreferences]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Preferences loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 push_enabled: { type: boolean, example: true }
 *                 message_notifications: { type: boolean, example: true }
 *                 price_alert_notifications: { type: boolean, example: true }
 *                 saved_search_notifications: { type: boolean, example: true }
 *                 offer_notifications: { type: boolean, example: true }
 *                 marketing_notifications: { type: boolean, example: false }
 *                 email_notifications: { type: boolean, example: true }
 *                 quiet_hours_enabled: { type: boolean, example: false }
 *                 quiet_hours_start: { type: string, example: "22:00:00" }
 *                 quiet_hours_end: { type: string, example: "08:00:00" }
 *                 quiet_hours_days:
 *                   type: array
 *                   items: { type: string }
 *                   example: ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]
 *                 subscription_email_reminders: { type: boolean, example: true }
 *                 subscription_push_reminders: { type: boolean, example: true }
 *                 subscription_sms_reminders: { type: boolean, example: false }
 *                 subscription_reminder_7_days: { type: boolean, example: true }
 *                 subscription_reminder_3_days: { type: boolean, example: true }
 *                 subscription_reminder_1_day: { type: boolean, example: true }
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/user/preferences", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.query.user_id; // prefer req.user.id
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const sql = `
      SELECT *
      FROM user_preferences
      WHERE user_id = :userId
      LIMIT 1;
    `;

    const rows = await sequelize.query(sql, {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT,
    });

    const data = rows?.[0];

    // Apply the same defaults as your client
    const preferences = {
      push_enabled: data?.push_enabled ?? true,
      message_notifications: data?.message_notifications ?? true,
      price_alert_notifications: data?.price_alert_notifications ?? true,
      saved_search_notifications: data?.saved_search_notifications ?? true,
      offer_notifications: data?.offer_notifications ?? true,
      marketing_notifications: data?.marketing_notifications ?? false,
      email_notifications: data?.email_notifications ?? true,
      quiet_hours_enabled: data?.quiet_hours_enabled ?? false,
      quiet_hours_start: data?.quiet_hours_start ?? "22:00:00",
      quiet_hours_end: data?.quiet_hours_end ?? "08:00:00",
      quiet_hours_days:
        data?.quiet_hours_days ??
        ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      subscription_email_reminders: data?.subscription_email_reminders ?? true,
      subscription_push_reminders: data?.subscription_push_reminders ?? true,
      subscription_sms_reminders: data?.subscription_sms_reminders ?? false,
      subscription_reminder_7_days: data?.subscription_reminder_7_days ?? true,
      subscription_reminder_3_days: data?.subscription_reminder_3_days ?? true,
      subscription_reminder_1_day: data?.subscription_reminder_1_day ?? true,
    };

    return res.json(preferences);
  } catch (err) {
    console.error("GET /api/user/preferences error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
