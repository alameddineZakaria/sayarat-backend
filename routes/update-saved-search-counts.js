const express = require('express');
const sequelize = require('../config/db');

/**
 * @swagger
 * /api/update-saved-search-counts:
 *   post:
 *     summary: Update saved search match counters
 *     tags:
 *       - Saved Search
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               saved_search_id:
 *                 type: integer
 *                 example: 99
 *               user_id:
 *                 type: integer
 *                 example: 45
 *             required: [saved_search_id, user_id]
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

const router = express.Router();

function vehicleMatchesSearch(vehicle, search) {
  const filters = (search && search.filters) || {};

  // Free text query
  if (search.search_query) {
    const q = String(search.search_query).toLowerCase();
    const hay = `${vehicle.title || ''} ${vehicle.make || ''} ${vehicle.model || ''}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }

  if (filters.make && filters.make !== 'All Makes' && vehicle.make !== filters.make) return false;
  if (filters.bodyType && filters.bodyType !== 'All Types' && vehicle.body_type !== filters.bodyType) return false;
  if (filters.location && filters.location !== 'All Locations' && vehicle.location !== filters.location) return false;
  if (filters.condition && filters.condition !== 'All' && vehicle.condition !== filters.condition) return false;
  if (filters.transmission && filters.transmission !== 'All' && vehicle.transmission !== filters.transmission) return false;
  if (filters.fuelType && filters.fuelType !== 'All' && vehicle.fuel_type !== filters.fuelType) return false;

  const minPrice = filters.minPrice !== undefined ? Number(filters.minPrice) : null;
  const maxPrice = filters.maxPrice !== undefined ? Number(filters.maxPrice) : null;
  if (minPrice !== null && !Number.isNaN(minPrice) && Number(vehicle.price) < minPrice) return false;
  if (maxPrice !== null && !Number.isNaN(maxPrice) && Number(vehicle.price) > maxPrice) return false;

  const minYear = filters.minYear !== undefined ? Number(filters.minYear) : null;
  const maxYear = filters.maxYear !== undefined ? Number(filters.maxYear) : null;
  if (minYear !== null && !Number.isNaN(minYear) && Number(vehicle.year) < minYear) return false;
  if (maxYear !== null && !Number.isNaN(maxYear) && Number(vehicle.year) > maxYear) return false;

  if (filters.color && filters.color !== 'All Colors') {
    const vehicleColor = (vehicle.specs && vehicle.specs.color ? String(vehicle.specs.color) : '').toLowerCase();
    const filterColor = String(filters.color).toLowerCase();
    if (!vehicleColor.includes(filterColor)) return false;
  }

  return true;
}

router.post('/', async (req, res) => {
  try {
    const { saved_search_id, user_id } = req.body || {};

    let whereClause = '';
    const replacements = {};
    if (saved_search_id) {
      whereClause = 'WHERE id = :saved_search_id';
      replacements.saved_search_id = saved_search_id;
    } else if (user_id) {
      whereClause = 'WHERE user_id = :user_id';
      replacements.user_id = user_id;
    }

    const [savedSearches] = await sequelize.query(
      `SELECT * FROM saved_searches ${whereClause}`,
      { replacements }
    );

    const [vehicles] = await sequelize.query(
      `SELECT * FROM vehicles WHERE status = 'active' AND (is_deleted IS NULL OR is_deleted = false)`
    );

    const updates = [];

    for (const search of savedSearches || []) {
      const matches = (vehicles || []).filter((v) => vehicleMatchesSearch(v, search));
      const currentCount = matches.length;
      const previousCount = Number(search.current_match_count || 0);
      let newMatchesSinceView = Number(search.new_matches_since_view || 0);
      if (currentCount > previousCount) newMatchesSinceView += (currentCount - previousCount);

      updates.push({
        id: search.id,
        current_match_count: currentCount,
        new_matches_since_view: newMatchesSinceView,
      });
    }

    for (const u of updates) {
      await sequelize.query(
        `UPDATE saved_searches
         SET last_match_count = current_match_count,
             current_match_count = :current_match_count,
             new_matches_since_view = :new_matches_since_view,
             updated_at = NOW()
         WHERE id = :id`,
        { replacements: { ...u } }
      );
    }

    return res.json({ success: true, updated_count: updates.length, updates });
  } catch (error) {
    console.error('Error updating saved search counts:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

module.exports = router;
