const express = require('express');
const router = express.Router();
const { Op, QueryTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * @swagger
 * /api/check-saved-search-matches:
 *   post:
 *     summary: Check new vehicle against saved searches and notify users
 *     tags: [Saved Search]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehicle_id
 *             properties:
 *               vehicle_id:
 *                 type: string
 *                 example: "uuid-of-vehicle"
 *     responses:
 *       200:
 *         description: Saved search matches processed successfully
 *       400:
 *         description: vehicle_id missing
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Server error
 */

router.post('/', async (req, res) => {
    try {
        const { vehicle_id } = req.body;

        if (!vehicle_id) {
            return res.status(400).json({ error: 'vehicle_id is required' });
        }

        /* ---------------- VEHICLE ---------------- */
        const vehicle = await sequelize.query(
            `SELECT * FROM vehicles WHERE id = :id LIMIT 1`,
            {
                replacements: { id: vehicle_id },
                type: QueryTypes.SELECT,
            }
        );

        if (!vehicle.length) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        const v = vehicle[0];

        /* ---------------- SAVED SEARCHES ---------------- */
        const savedSearches = await sequelize.query(
            `SELECT * FROM saved_searches WHERE notify_new_matches = true`,
            { type: QueryTypes.SELECT }
        );

        const matchedSearches = [];
        const userIds = new Set();

        for (const search of savedSearches) {
            if (vehicleMatchesSearch(v, search)) {
                matchedSearches.push(search);
                userIds.add(search.user_id);

                /* upsert saved_search_matches */
                await sequelize.query(
                    `
          INSERT INTO saved_search_matches (saved_search_id, vehicle_id, notified)
          VALUES (:searchId, :vehicleId, false)
          ON CONFLICT (saved_search_id, vehicle_id)
          DO NOTHING
          `,
                    {
                        replacements: {
                            searchId: search.id,
                            vehicleId: vehicle_id,
                        },
                    }
                );

                /* update counters */
                await sequelize.query(
                    `
          UPDATE saved_searches
          SET
            new_matches_since_view = COALESCE(new_matches_since_view,0) + 1,
            current_match_count = COALESCE(current_match_count,0) + 1
          WHERE id = :id
          `,
                    { replacements: { id: search.id } }
                );
            }
        }

        /* ---------------- USER LANGUAGES ---------------- */
        const languages = await sequelize.query(
            `
      SELECT user_id, language
      FROM user_preferences
      WHERE user_id IN (:ids)
      `,
            {
                replacements: { ids: [...userIds] },
                type: QueryTypes.SELECT,
            }
        );

        const userLanguageMap = new Map();
        languages.forEach(l => l.language && userLanguageMap.set(l.user_id, l.language));

        /* ---------------- PRICE FORMAT ---------------- */
        const formattedPrice = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(v.price);

        const formattedPriceAr = new Intl.NumberFormat('ar-LB', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(v.price);

        /* ---------------- NOTIFICATIONS ---------------- */
        for (const search of matchedSearches) {
            const lang = userLanguageMap.get(search.user_id) || 'en';

            await sequelize.query(
                `
        INSERT INTO notifications
        (user_id, type, title, message, data, is_read)
        VALUES
        (:userId, 'saved_search_match', :title, :message, :data, false)
        `,
                {
                    replacements: {
                        userId: search.user_id,
                        title: lang === 'ar' ? 'مركبة جديدة مطابقة!' : 'New Vehicle Match!',
                        message:
                            lang === 'ar'
                                ? `${v.year} ${v.make} ${v.model} - ${formattedPriceAr}`
                                : `${v.year} ${v.make} ${v.model} - ${formattedPrice}`,
                        data: JSON.stringify({
                            vehicle_id: v.id,
                            vehicle_title: v.title,
                            saved_search_id: search.id,
                            deep_link: `/vehicle/${v.id}`,
                        }),
                    },
                }
            );

            await sequelize.query(
                `
        UPDATE saved_searches
        SET
          last_notified_at = NOW(),
          match_count = COALESCE(match_count,0) + 1
        WHERE id = :id
        `,
                { replacements: { id: search.id } }
            );

            await sequelize.query(
                `
        UPDATE saved_search_matches
        SET notified = true
        WHERE saved_search_id = :sid AND vehicle_id = :vid
        `,
                {
                    replacements: {
                        sid: search.id,
                        vid: vehicle_id,
                    },
                }
            );

            /* push notification (non-blocking) */
            try {
                await fetch(`${process.env.API_BASE_URL}/api/push/send`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: search.user_id,
                        title: 'New Vehicle Match!',
                        titleAr: 'مركبة جديدة مطابقة!',
                        body: `${v.year} ${v.make} ${v.model} - ${formattedPrice}`,
                        bodyAr: `${v.year} ${v.make} ${v.model} - ${formattedPriceAr}`,
                        type: 'saved_search_match',
                        data: {
                            vehicleId: v.id,
                            savedSearchId: search.id,
                            deepLink: `/vehicle/${v.id}`,
                        },
                    }),
                });
            } catch (e) {
                console.log('Push failed (ignored):', e.message);
            }
        }

        res.json({
            success: true,
            matched_searches: matchedSearches.length,
            vehicle_id,
            users_notified: userIds.size,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


function vehicleMatchesSearch(vehicle, search) {
    const filters = search.filters || {};

    if (search.search_query) {
        const q = search.search_query.toLowerCase();
        const text = `${vehicle.title} ${vehicle.make} ${vehicle.model}`.toLowerCase();
        if (!text.includes(q)) return false;
    }

    if (filters.make && filters.make !== 'All Makes' && vehicle.make !== filters.make) return false;
    if (filters.bodyType && filters.bodyType !== 'All Types' && vehicle.body_type !== filters.bodyType) return false;
    if (filters.location && filters.location !== 'All Locations' && vehicle.location !== filters.location) return false;
    if (filters.condition && filters.condition !== 'All' && vehicle.condition !== filters.condition) return false;
    if (filters.transmission && filters.transmission !== 'All' && vehicle.transmission !== filters.transmission) return false;
    if (filters.fuelType && filters.fuelType !== 'All' && vehicle.fuel_type !== filters.fuelType) return false;

    if (filters.color && filters.color !== 'All Colors') {
        const vColor = vehicle.specs?.color?.toLowerCase() || '';
        if (!vColor.includes(filters.color.toLowerCase())) return false;
    }

    if (filters.minPrice && vehicle.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && vehicle.price > parseInt(filters.maxPrice)) return false;

    if (filters.minYear && vehicle.year < parseInt(filters.minYear)) return false;
    if (filters.maxYear && vehicle.year > parseInt(filters.maxYear)) return false;

    if (filters.priceRange && !filters.minPrice && !filters.maxPrice) {
        const p = vehicle.price;
        if (filters.priceRange === 'Under $30,000' && p >= 30000) return false;
        if (filters.priceRange === '$30,000 - $50,000' && (p < 30000 || p > 50000)) return false;
        if (filters.priceRange === '$50,000 - $80,000' && (p < 50000 || p > 80000)) return false;
        if (filters.priceRange === '$80,000 - $120,000' && (p < 80000 || p > 120000)) return false;
        if (filters.priceRange === '$120,000 - $200,000' && (p < 120000 || p > 200000)) return false;
        if (filters.priceRange === 'Over $200,000' && p <= 200000) return false;
    }

    return true;
}

module.exports = router;
