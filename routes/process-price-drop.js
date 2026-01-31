const express = require('express');
const sequelize = require('../config/db');

/**
 * @swagger
 * /api/process-price-drop:
 *   post:
 *     summary: Process a price drop event and trigger notifications
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicle_id:
 *                 type: integer
 *                 example: 123
 *               old_price:
 *                 type: number
 *                 example: 15000
 *               new_price:
 *                 type: number
 *                 example: 14000
 *             required: [vehicle_id, old_price, new_price]
 *     responses:
 *       200:
 *         description: Processed
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { vehicle_id, old_price, new_price } = req.body || {};

    if (!vehicle_id || old_price === undefined || new_price === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (Number(new_price) >= Number(old_price)) {
      return res.json({ message: 'Price did not drop, no alerts sent' });
    }

    // Record price history (best-effort)
    try {
      await sequelize.query(
        `INSERT INTO vehicle_price_history (vehicle_id, old_price, new_price) VALUES (:vehicle_id, :old_price, :new_price)`,
        { replacements: { vehicle_id, old_price, new_price } }
      );
    } catch (e) {
      // Table may not exist in some deployments
    }

    // Get vehicle
    const [vehRows] = await sequelize.query(
      `SELECT * FROM vehicles WHERE id = :vehicle_id LIMIT 1`,
      { replacements: { vehicle_id } }
    );
    const vehicle = vehRows && vehRows[0];
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Direct vehicle alerts
    const [vehicleAlerts] = await sequelize.query(
      `SELECT * FROM price_alerts WHERE vehicle_id = :vehicle_id AND is_active = true`,
      { replacements: { vehicle_id } }
    );

    // Search alerts
    const [searchAlerts] = await sequelize.query(
      `SELECT * FROM price_alerts WHERE alert_type = 'search' AND is_active = true`,
      {}
    );

    const matchingSearchAlerts = (searchAlerts || []).filter((alert) => {
      const criteria = alert.search_criteria;
      if (!criteria) return false;
      const c = typeof criteria === 'string' ? safeJsonParse(criteria) : criteria;
      if (!c) return false;
      if (c.make && c.make !== vehicle.make) return false;
      if (c.model && c.model !== vehicle.model) return false;
      if (c.min_year && Number(vehicle.year) < Number(c.min_year)) return false;
      if (c.max_year && Number(vehicle.year) > Number(c.max_year)) return false;
      if (c.max_price && Number(new_price) > Number(c.max_price)) return false;
      return true;
    });

    const allAlerts = [...(vehicleAlerts || []), ...matchingSearchAlerts];

    const priceDrop = Number(old_price) - Number(new_price);
    const priceDropPercent = old_price ? ((priceDrop / Number(old_price)) * 100) : 0;

    const title = 'Price Drop Alert!';
    const vehicleTitle = `${vehicle.year || ''} ${vehicle.make || ''} ${vehicle.model || ''}`.trim();
    const msg = `${vehicleTitle} dropped from ${Number(old_price).toLocaleString()} to ${Number(new_price).toLocaleString()} (${priceDropPercent.toFixed(1)}% off)`;

    const notifications = allAlerts.map((alert) => ({
      user_id: alert.user_id,
      type: 'price_drop',
      title,
      message: msg,
      data: JSON.stringify({
        vehicle_id: vehicle.id,
        vehicle_title: vehicleTitle,
        old_price,
        new_price,
        price_drop: priceDrop,
        price_drop_percent: Number(priceDropPercent.toFixed(1)),
        image_url: Array.isArray(vehicle.images) ? vehicle.images[0] : null,
      }),
      is_read: false,
    }));

    if (notifications.length > 0) {
      try {
        for (const n of notifications) {
          await sequelize.query(
            `INSERT INTO notifications (user_id, type, title, message, data, is_read)
             VALUES (:user_id, :type, :title, :message, :data::jsonb, :is_read)`,
            { replacements: n }
          );
        }
      } catch (e) {
        // fallback if data isn't jsonb
        for (const n of notifications) {
          await sequelize.query(
            `INSERT INTO notifications (user_id, type, title, message, data, is_read)
             VALUES (:user_id, :type, :title, :message, :data, :is_read)`,
            { replacements: n }
          );
        }
      }

      // Update last_notified_at
      const alertIds = allAlerts.map((a) => a.id).filter(Boolean);
      if (alertIds.length) {
        await sequelize.query(
          `UPDATE price_alerts SET last_notified_at = NOW() WHERE id = ANY(:ids)`,
          { replacements: { ids: alertIds } }
        ).catch(() => {});
      }
    }

    return res.json({
      success: true,
      notifications_sent: notifications.length,
      price_drop: priceDrop,
      price_drop_percent: priceDropPercent.toFixed(1),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

function safeJsonParse(v) {
  try { return JSON.parse(v); } catch { return null; }
}

module.exports = router;
