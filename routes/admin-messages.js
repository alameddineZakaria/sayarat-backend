const express = require('express');
const { Op } = require('sequelize');
const crypto = require('crypto');
const { Message } = require('../models');

const router = express.Router();
 
/**
 * @swagger
 * /api/admin-messages:
 *   post:
 *     summary: Admin messages actions (list, get, update status, add note, reply)
 *     tags: [Admin Messages]
 *     description: |
 *       Single endpoint that performs multiple actions based on the `action` field.
 *       Possible actions:
 *       - list
 *       - get
 *       - update_status
 *       - add_note
 *       - reply
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [list, get, update_status, add_note, reply]
 *                 example: list
 *
 *               status_update:
 *                 type: string
 *                 example: new
 *                 description: Filter messages by status (list only)
 *
 *               search:
 *                 type: string
 *                 example: john
 *                 description: Search in message content (list only)
 *
 *               limit:
 *                 type: integer
 *                 example: 50
 *                 description: Pagination limit (list only)
 *
 *               offset:
 *                 type: integer
 *                 example: 0
 *                 description: Pagination offset (list only)
 *
 *               id:
 *                 type: string
 *                 format: uuid
 *                 example: 6f5d9a90-52c6-4c1d-8c39-6c59ad3b92a3
 *                 description: Message ID (get, update_status, add_note, reply)
 *
 *               
 *               note:
 *                 type: string
 *                 example: Customer asked for a callback
 *                 description: Internal note text (add_note only)
 *
 *               reply:
 *                 type: string
 *                 example: Thank you for contacting us. We will get back to you shortly.
 *                 description: Reply message text (reply only)
 *
 *               admin_id:
 *                 type: string
 *                 format: uuid
 *                 example: 1a2b3c4d-1234-5678-9abc-def012345678
 *                 description: Admin user ID (add_note, reply)
 *
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 messages:
 *                   type: array
 *                   description: List of messages (list action)
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *
 *                 message:
 *                   $ref: '#/components/schemas/Message'
 *
 *                 total:
 *                   type: integer
 *                   example: 120
 *
 *                 stats:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     new:
 *                       type: integer
 *                     read:
 *                       type: integer
 *                     replied:
 *                       type: integer
 *                     archived:
 *                       type: integer
 *
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Message not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         conversation_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         sender_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         content:
 *           type: string
 *           nullable: true
 *         message_type:
 *           type: string
 *           nullable: true
 *         attachments:
 *           type: array
 *           items:
 *             type: object
 *         is_read:
 *           type: boolean
 *         read_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         replies:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               text:
 *                 type: string
 *               admin_id:
 *                 type: string
 *                 format: uuid
 *               sent_at:
 *                 type: string
 *                 format: date-time
 *         internal_notes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               text:
 *                 type: string
 *               admin_id:
 *                 type: string
 *                 format: uuid
 *               created_at:
 *                 type: string
 *                 format: date-time
 *         status:
 *           type: string
 *           example: new
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 */

/**
 * POST /admin/messages
 * body.action determines behavior
 */
router.post('/', async (req, res) => {
    try {
        const { action = 'list' } = req.body;

        /* =======================
           LIST MESSAGES
        ======================= */
        if (action === 'list') {
            const {
                status = '',
                search = '',
                limit = 50,
                offset = 0
            } = req.body;

            const where = {};

            if (status && status !== 'all') {
                where.status = status;
            }

            if (search) {
                where[Op.or] = [
                    { content: { [Op.iLike]: `%${search}%` } }
                ];
            }

            const { rows, count } = await Message.findAndCountAll({
                where,
                limit,
                offset,
                order: [['created_at', 'DESC']]
            });

            // Stats (same logic as Supabase fallback)
            const all = await Message.findAll();

            const stats = {
                total: all.length,
                new: all.filter(m => m.status === 'new').length,
                read: all.filter(m => m.status === 'read').length,
                replied: all.filter(m => m.status === 'replied').length,
                archived: all.filter(m => m.status === 'archived').length
            };

            return res.json({
                success: true,
                messages: rows,
                total: count,
                stats
            });
        }

        /* =======================
           GET SINGLE MESSAGE
        ======================= */
        if (action === 'get') {
            const { id } = req.body;
            if (!id) {
                return res.status(400).json({ success: false, error: 'Message ID required' });
            }

            const message = await Message.findByPk(id);
            if (!message) {
                return res.status(404).json({ success: false, error: 'Message not found' });
            }

            return res.json({ success: true, message });
        }

        /* =======================
           UPDATE STATUS
        ======================= */
        if (action === 'update_status') {
            const { id, status } = req.body;

            if (!id || !status) {
                return res.status(400).json({ success: false, error: 'ID and status required' });
            }

            const message = await Message.findByPk(id);
            if (!message) {
                return res.status(404).json({ success: false, error: 'Message not found' });
            }

            message.status = status;
            message.updated_at = new Date();

            if (status === 'read') {
                message.is_read = true;
                message.read_at = new Date();
            }

            await message.save();

            return res.json({ success: true, message });
        }

        /* =======================
           ADD INTERNAL NOTE
        ======================= */
        if (action === 'add_note') {
            const { id, note, admin_id } = req.body;

            if (!id || !note) {
                return res.status(400).json({ success: false, error: 'ID and note required' });
            }

            const message = await Message.findByPk(id);
            if (!message) {
                return res.status(404).json({ success: false, error: 'Message not found' });
            }

            const notes = message.internal_notes || [];
            notes.push({
                id: crypto.randomUUID(),
                text: note,
                admin_id,
                created_at: new Date().toISOString()
            });

            message.internal_notes = notes;
            message.updated_at = new Date();
            await message.save();

            return res.json({ success: true, message });
        }

        /* =======================
           REPLY
        ======================= */
        if (action === 'reply') {
            const { id, reply, admin_id } = req.body;

            if (!id || !reply) {
                return res.status(400).json({ success: false, error: 'ID and reply text required' });
            }

            const message = await Message.findByPk(id);
            if (!message) {
                return res.status(404).json({ success: false, error: 'Message not found' });
            }

            const replies = message.replies || [];
            replies.push({
                id: crypto.randomUUID(),
                text: reply,
                admin_id,
                sent_at: new Date().toISOString()
            });

            message.replies = replies;
            message.status = 'replied';
            message.updated_at = new Date();

            await message.save();

            return res.json({ success: true, message });
        }

        return res.status(400).json({ success: false, error: 'Invalid action' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: 'Server error', err });
    }
});

module.exports = router;
