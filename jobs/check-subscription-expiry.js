const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');
const sendRenewalReminderEmail = require('../services/email.service');
const sendPushNotification = require('../services/push.service');
const sendSMS = require('../services/sms.service');

const GRACE_PERIOD_DAYS = 7;
const WARNING_DAYS = [7, 3, 1];

module.exports = async function checkSubscriptionExpiry() {
  const now = new Date();
  const notifications = [];

  /* ---------------- WARNING PHASE ---------------- */
  for (const warningDay of WARNING_DAYS) {
    const target = new Date(now.getTime() + warningDay * 86400000);
    const start = new Date(target.setHours(0, 0, 0, 0));
    const end = new Date(target.setHours(23, 59, 59, 999));

    const subs = await sequelize.query(
      `
      SELECT s.*, u.email, u.full_name, u.phone, u.push_token, u.language
      FROM subscriptions s
      JOIN users u ON u.id = s.user_id
      WHERE s.status = 'active'
        AND s.current_period_end BETWEEN :start AND :end
      `,
      {
        replacements: { start, end },
        type: QueryTypes.SELECT,
      }
    );

    for (const sub of subs) {
      const alreadyNotified = await sequelize.query(
        `
        SELECT id FROM notifications
        WHERE user_id = :uid
          AND type = 'subscription_expiry'
          AND created_at >= NOW() - INTERVAL '24 hours'
        LIMIT 1
        `,
        {
          replacements: { uid: sub.user_id },
          type: QueryTypes.SELECT,
        }
      );

      if (alreadyNotified.length) continue;

      const lang = sub.language || 'en';
      const isAr = lang === 'ar';
      const tierName =
        sub.tier === 'basic' ? 'Basic' :
        sub.tier === 'pro' ? 'Pro' : 'Premium';

      const title =
        warningDay === 1
          ? isAr ? 'اشتراكك ينتهي غداً!' : 'Subscription Expires Tomorrow!'
          : isAr ? `اشتراكك ينتهي خلال ${warningDay} أيام`
                 : `Subscription Expiring in ${warningDay} Days`;

      const message =
        warningDay === 1
          ? isAr
            ? `اشتراكك ${tierName} ينتهي غداً.`
            : `Your ${tierName} subscription expires tomorrow.`
          : isAr
            ? `اشتراكك ${tierName} ينتهي خلال ${warningDay} أيام.`
            : `Your ${tierName} subscription expires in ${warningDay} days.`;

      await sequelize.query(
        `
        INSERT INTO notifications
        (user_id, type, title, message, data, is_read)
        VALUES (:uid, 'subscription_expiry', :title, :message, :data, false)
        `,
        {
          replacements: {
            uid: sub.user_id,
            title,
            message,
            data: JSON.stringify({
              subscription_id: sub.id,
              tier: sub.tier,
              days_until_expiry: warningDay,
              is_urgent: warningDay <= 3,
              action_url: '/subscription',
            }),
          },
        }
      );

      if (sub.email) {
        await sendRenewalReminderEmail(
          sub.email,
          sub.full_name,
          sub.tier,
          sub.current_period_end,
          warningDay,
          lang
        );
      }

      if (sub.push_token) {
        await sendPushNotification(
          sub.push_token,
          title,
          message,
          {
            type: 'subscription_expiry',
            subscription_id: sub.id,
            is_urgent: warningDay <= 3,
          }
        );
      }

      if (warningDay <= 3 && sub.phone) {
        await sendSMS(sub.phone,
          `Your ${tierName} subscription expires in ${warningDay} day(s). Renew now.`
        );
      }

      notifications.push({ user_id: sub.user_id, warningDay });
    }
  }

  /* ---------------- EXPIRED → GRACE ---------------- */
  const expired = await sequelize.query(
    `
    SELECT s.*, u.push_token, u.language
    FROM subscriptions s
    JOIN users u ON u.id = s.user_id
    WHERE s.status = 'active'
      AND s.current_period_end < NOW()
    `,
    { type: QueryTypes.SELECT }
  );

  for (const sub of expired) {
    const daysSince = Math.ceil(
      (now - new Date(sub.current_period_end)) / 86400000
    );

    if (daysSince <= GRACE_PERIOD_DAYS) {
      await sequelize.query(
        `UPDATE subscriptions SET status = 'past_due' WHERE id = :id`,
        { replacements: { id: sub.id } }
      );
    } else {
      await sequelize.query(
        `UPDATE subscriptions SET status = 'expired' WHERE id = :id`,
        { replacements: { id: sub.id } }
      );

      await sequelize.query(
        `
        UPDATE vehicles
        SET status = 'hidden', hidden_reason = 'subscription_expired'
        WHERE user_id = :uid AND status = 'active'
        `,
        { replacements: { uid: sub.user_id } }
      );
    }
  }

  return {
    success: true,
    notifications_sent: notifications.length,
  };
};
