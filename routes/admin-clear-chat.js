const express = require("express");
const sequelize = require('../config/db');

const router = express.Router();

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
/**
 * @swagger
 * /api/admin-clear-chat:
 *   post:
 *     summary: Clear data from tables
 *     tags:
 *       - Admin clear chat
 *     description: Delete all rows from messages, conversations, offers, and related tables
 *     requestBody:
 *       description: Type of data to clear ("messages", "offers", or "all")
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [messages, offers, all]
 *                 default: all
 *     responses:
 *       200:
 *         description: Tables cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 result:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *       500:
 *         description: Error clearing tables
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

// Function to delete all rows from a table using Sequelize
async function deleteFromTable(table) {
    try {
        const [results] = await sequelize.query(`DELETE FROM "${table}"`);
        // Sequelize's query returns an array with affectedRows in MySQL/Postgres
        const affectedRows = results?.rowCount ?? results?.affectedRows ?? 0;
        return `cleared (${affectedRows} rows)`;
    } catch (e) {
        return `error: ${e.message}`;
    }
}

 
router.use((req, res, next) => {
  res.set(corsHeaders);
  next();
});
// Main endpoint
router.post('/', async (req, res) => {
    try {
        const body = req.body || { type: 'all' };
        const type = body.type || 'all';
        const result = {};

        if (type === 'messages' || type === 'all') {
            result.messages = await deleteFromTable('messages');
            result.conversations = await deleteFromTable('conversations');
            result.archived_conversations = await deleteFromTable('archived_conversations');
            result.muted_conversations = await deleteFromTable('muted_conversations');
            result.deleted_conversations = await deleteFromTable('deleted_conversations');
        }

        if (type === 'offers' || type === 'all') {
            result.offer_messages = await deleteFromTable('offer_messages');
            result.offer_notifications = await deleteFromTable('offer_notifications');
            result.offers = await deleteFromTable('offers');
        }

        res.set(corsHeaders).json({ success: true, result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).set(corsHeaders).json({ error: error.message });
    }
});

module.exports = router;
