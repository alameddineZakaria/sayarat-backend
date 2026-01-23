const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
/**
 * @swagger
 * /api/admin-analytics:
 *   post:
 *     summary: Get admin dashboard statistics
 *     tags:
 *       - Admin Analytics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               period:
 *                 type: string
 *                 example: 30d
 *     responses:
 *       200:
 *         description: Dashboard statistics
 */
// Import your Sequelize models
const {
  User,
  Dealer,
  Vehicle,
  UserReport,
  ListingReport,
  ListingBoost,
  PromoCode,
  Message
} = require("../models");

// Admin verification middleware
async function verifyAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No authorization header" });

    const token = authHeader.replace("Bearer ", "");
    // Replace with your real JWT/session verification
    const user = await User.findOne({ where: { id: token } });
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const adminUser = await Dealer.findOne({ where: { user_id: user.id, is_admin: true } });
    if (!adminUser) return res.status(403).json({ error: "Not an admin user" });

    req.adminUser = adminUser;
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to verify admin" });
  }
}

// Route
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const { action, period = "30d", page = 1, limit = 20, search, status, type } = req.body;
    const offset = (page - 1) * limit;

    // Calculate start date
    let startDate = new Date();
    switch (period) {
      case "7d": startDate.setDate(startDate.getDate() - 7); break;
      case "30d": startDate.setDate(startDate.getDate() - 30); break;
      case "90d": startDate.setDate(startDate.getDate() - 90); break;
      case "1y": startDate.setFullYear(startDate.getFullYear() - 1); break;
    }

    if (action === "dashboard_stats") {
      // Users
      const totalUsers = await User.count();
      const newUsers = await User.count({ where: { created_at: { [Op.gte]: startDate } } });
      const totalDealers = await Dealer.count();
      const verifiedDealers = await Dealer.count({ where: { verified: true } });

      // Vehicles
      const totalListings = await Vehicle.count();
      const activeListings = await Vehicle.count({ where: { status: "active" } });
      const newListings = await Vehicle.count({ where: { created_at: { [Op.gte]: startDate } } });

      // Reports
      const pendingUserReports = await UserReport.count({ where: { status: "pending" } });
      const pendingListingReports = await ListingReport.count({ where: { status: "pending" } });

      // Boost revenue
      const boostRevenueRaw = await ListingBoost.findAll({
        attributes: ["amount_paid"],
        where: {
          created_at: { [Op.gte]: startDate },
          status: "active"
        }
      });
      const boostRevenue = boostRevenueRaw.reduce((sum, b) => sum + (b.amount_paid || 0), 0);

      // Messages
      const totalMessages = await Message.count({ where: { created_at: { [Op.gte]: startDate } } });

      // Promo codes
      const activePromoCodes = await PromoCode.count({ where: { is_active: true } });

      return res.json({
        success: true,
        stats: {
          users: { total: totalUsers, new: newUsers, dealers: totalDealers, verifiedDealers },
          listings: { total: totalListings, active: activeListings, new: newListings },
          reports: { pendingUsers: pendingUserReports, pendingListings: pendingListingReports, total: pendingUserReports + pendingListingReports },
          revenue: { boosts: boostRevenue, period },
          engagement: { messages: totalMessages, activePromoCodes }
        }
      });
    }

    if (action === "get_users") {
      const whereClause = search ? {
        [Op.or]: [
          { full_name: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } }
        ]
      } : {};

      const { rows: users, count } = await User.findAndCountAll({
        where: whereClause,
        offset,
        limit,
        order: [["created_at", "DESC"]],
        include: [{ model: Dealer }, { model: UserReport }]
      });

      return res.json({ success: true, users, total: count, page, limit });
    }

    if (action === "get_listings") {
      const whereClause = {};
      if (status) whereClause.status = status;

      if (search) {
        whereClause[Op.or] = [
          { title: { [Op.iLike]: `%${search}%` } },
          { make: { [Op.iLike]: `%${search}%` } },
          { model: { [Op.iLike]: `%${search}%` } }
        ];
      }

      const { rows: listings, count } = await Vehicle.findAndCountAll({
        where: whereClause,
        offset,
        limit,
        order: [["created_at", "DESC"]]
      });

      return res.json({ success: true, listings, total: count, page, limit });
    }

    if (action === "get_reports") {
      let userReports = [];
      let listingReports = [];

      if (!type || type === "all" || type === "users") {
        userReports = await UserReport.findAll({ where: { status: "pending" }, order: [["created_at", "DESC"]] });
      }

      if (!type || type === "all" || type === "listings") {
        listingReports = await ListingReport.findAll({ where: { status: "pending" }, order: [["created_at", "DESC"]] });
      }

      return res.json({ success: true, userReports, listingReports });
    }

    res.status(400).json({ success: false, error: "Invalid action" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
