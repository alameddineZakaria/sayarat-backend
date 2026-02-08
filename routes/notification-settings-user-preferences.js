const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // your Sequelize instance
// const requireAuth = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: UserPreferences
 *   description: User notification and preference settings
 */

/**
 * @swagger
 * /api/notification-settings-user-preferences/user/preferences:
 *   put:
 *     summary: Save user preferences
 *     description: Creates or updates user preferences using UPSERT on user_id
 *     tags: [UserPreferences,queries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               push_enabled: { type: boolean }
 *               message_notifications: { type: boolean }
 *               price_alert_notifications: { type: boolean }
 *               saved_search_notifications: { type: boolean }
 *               offer_notifications: { type: boolean }
 *               marketing_notifications: { type: boolean }
 *               email_notifications: { type: boolean }
 *               quiet_hours_enabled: { type: boolean }
 *               quiet_hours_start: { type: string, example: "22:00:00" }
 *               quiet_hours_end: { type: string, example: "08:00:00" }
 *               quiet_hours_days:
 *                 type: array
 *                 items: { type: string }
 *               subscription_email_reminders: { type: boolean }
 *               subscription_push_reminders: { type: boolean }
 *               subscription_sms_reminders: { type: boolean }
 *               subscription_reminder_7_days: { type: boolean }
 *               subscription_reminder_3_days: { type: boolean }
 *               subscription_reminder_1_day: { type: boolean }
 *     responses:
 *       200:
 *         description: Preferences saved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put("/user/preferences", /* requireAuth, */ async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.user_id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const p = req.body;
    const updatedAt = new Date().toISOString();

    const sql = `
      INSERT INTO user_preferences (
        user_id,
        push_enabled,
        message_notifications,
        price_alert_notifications,
        saved_search_notifications,
        offer_notifications,
        marketing_notifications,
        email_notifications,
        quiet_hours_enabled,
        quiet_hours_start,
        quiet_hours_end,
        quiet_hours_days,
        subscription_email_reminders,
        subscription_push_reminders,
        subscription_sms_reminders,
        subscription_reminder_7_days,
        subscription_reminder_3_days,
        subscription_reminder_1_day,
        updated_at
      )
      VALUES (
        :userId,
        :push_enabled,
        :message_notifications,
        :price_alert_notifications,
        :saved_search_notifications,
        :offer_notifications,
        :marketing_notifications,
        :email_notifications,
        :quiet_hours_enabled,
        :quiet_hours_start,
        :quiet_hours_end,
        :quiet_hours_days,
        :subscription_email_reminders,
        :subscription_push_reminders,
        :subscription_sms_reminders,
        :subscription_reminder_7_days,
        :subscription_reminder_3_days,
        :subscription_reminder_1_day,
        :updated_at
      )
      ON CONFLICT (user_id) DO UPDATE SET
        push_enabled = EXCLUDED.push_enabled,
        message_notifications = EXCLUDED.message_notifications,
        price_alert_notifications = EXCLUDED.price_alert_notifications,
        saved_search_notifications = EXCLUDED.saved_search_notifications,
        offer_notifications = EXCLUDED.offer_notifications,
        marketing_notifications = EXCLUDED.marketing_notifications,
        email_notifications = EXCLUDED.email_notifications,
        quiet_hours_enabled = EXCLUDED.quiet_hours_enabled,
        quiet_hours_start = EXCLUDED.quiet_hours_start,
        quiet_hours_end = EXCLUDED.quiet_hours_end,
        quiet_hours_days = EXCLUDED.quiet_hours_days,
        subscription_email_reminders = EXCLUDED.subscription_email_reminders,
        subscription_push_reminders = EXCLUDED.subscription_push_reminders,
        subscription_sms_reminders = EXCLUDED.subscription_sms_reminders,
        subscription_reminder_7_days = EXCLUDED.subscription_reminder_7_days,
        subscription_reminder_3_days = EXCLUDED.subscription_reminder_3_days,
        subscription_reminder_1_day = EXCLUDED.subscription_reminder_1_day,
        updated_at = EXCLUDED.updated_at
      RETURNING *;
    `;

    const [row] = await sequelize.query(sql, {
      replacements: { userId, updated_at: updatedAt, ...p },
      type: sequelize.QueryTypes.SELECT,
    });

    return res.json({ ok: true, data: row });
  } catch (err) {
    console.error("PUT /api/user/preferences error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
