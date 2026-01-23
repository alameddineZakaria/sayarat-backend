const express = require("express");
const sequelize = require("../config/db"); // your Sequelize instance
const router = express.Router();

/**
 * Apply eq filters and limit to raw Sequelize query
 */
function buildQuery(table, queryParams) {
    // Default to all columns
    const columns = queryParams.columns ? queryParams.columns : "*";

    let sql = `SELECT ${columns} FROM ${table}`;
    const replacements = {};

    // Filters (eq)
    if (queryParams.eq) {
        const eqFilters = [];
        for (const key in queryParams.eq) {
            const paramName = `eq_${key}`;
            eqFilters.push(`${key} = :${paramName}`);
            replacements[paramName] = queryParams.eq[key];
        }
        if (eqFilters.length > 0) sql += ` WHERE ${eqFilters.join(" AND ")}`;
    }

    // Limit
    if (queryParams.limit) {
        sql += ` LIMIT :limit`;
        replacements.limit = parseInt(queryParams.limit);
    }

    return { sql, replacements };
}


/**
 * @swagger
 * /function/{table}:
 *   get:
 *     summary: Fetch records from a table
 *     description: Returns records from the specified table with optional filters, limits, and selected columns.
 *     tags:
 *       - Query builder
 *     parameters:
 *       - in: path
 *         name: table
 *         required: true
 *         schema:
 *           type: string
 *         description: Table name
 *         example: ab_tests 
 *       - in: query
 *         name: eq
 *         schema:
 *           type: string
 *           example: '{"id":"14a70231-e4b7-4344-b4ca-0d1b85952d10"}'
 *         description: JSON string of equality filters
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Maximum number of records to return
 *       - in: query
 *         name: columns
 *         schema:
 *           type: string
 *           example: "id,name"
 *         description: Comma-separated list of columns to return
 *     responses:
 *       200:
 *         description: List of records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Server error
 */
 
// GET /:table?eq={"id":1}&limit=10&columns=id,name
router.get("/:table", async (req, res) => {
    try {
        const table = req.params.table;
        const queryParams = { ...req.query };

        // Parse eq JSON if sent as string
        if (queryParams.eq && typeof queryParams.eq === "string") {
            queryParams.eq = JSON.parse(queryParams.eq);
        }

        const { sql, replacements } = buildQuery(table, queryParams);

        const results = await sequelize.query(sql, {
            replacements,
            type: sequelize.QueryTypes.SELECT,
        });

        res.json({ success: true, data: results });
    } catch (err) {
        console.error("Table GET Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * @swagger
 * /function/{table}:
 *   post:
 *     summary: Insert a record into a table
 *     description: Inserts a new record into the specified table.
 *     tags:
 *       - Query builder
 *     parameters:
 *       - in: path
 *         name: table
 *         required: true
 *         schema:
 *           type: string
 *         description: Table name
 *       - in: body
 *         name: payload
 *         required: true
 *         description: JSON object containing column-value pairs
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: Record inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       500:
 *         description: Server error
 */

// POST /:table — insert
router.post("/:table", async (req, res) => {
    try {
        const table = req.params.table;
        const payload = req.body;

        const columns = Object.keys(payload).join(",");
        const values = Object.keys(payload)
            .map((k) => `:${k}`)
            .join(",");

        const sql = `INSERT INTO ${table} (${columns}) VALUES (${values})`;

        await sequelize.query(sql, {
            replacements: payload,
            type: sequelize.QueryTypes.INSERT,
        });

        res.json({ success: true, data: payload });
    } catch (err) {
        console.error("Table POST Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});
/**
 * @swagger
 * /function/{table}:
 *   put:
 *     summary: Update a record in a table
 *     description: Updates an existing record in the specified table. The payload must include the `id` field.
 *     tags:
 *       - Query builder
 *     parameters:
 *       - in: path
 *         name: table
 *         required: true
 *         schema:
 *           type: string
 *         description: Table name
 *       - in: body
 *         name: payload
 *         required: true
 *         description: JSON object containing the `id` and fields to update
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: Record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       400:
 *         description: Missing ID
 *       500:
 *         description: Server error
 */

// PUT /:table — update (requires `id` in body)
router.put("/:table", async (req, res) => {
    try {
        const table = req.params.table;
        const payload = req.body;

        if (!payload.id) return res.status(400).json({ success: false, error: "ID is required" });

        const fields = Object.keys(payload)
            .filter((k) => k !== "id")
            .map((k) => `${k} = :${k}`)
            .join(",");

        const sql = `UPDATE ${table} SET ${fields} WHERE id = :id`;

        await sequelize.query(sql, {
            replacements: payload,
            type: sequelize.QueryTypes.UPDATE,
        });

        res.json({ success: true, data: payload });
    } catch (err) {
        console.error("Table PUT Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});
/**
 * @swagger
 * /function/{table}:
 *   delete:
 *     summary: Delete a record from a table
 *     description: Deletes a record from the specified table by ID.
 *     tags:
 *       - Query builder
 *     parameters:
 *       - in: path
 *         name: table
 *         required: true
 *         schema:
 *           type: string
 *         description: Table name
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the record to delete
 *     responses:
 *       200:
 *         description: Record deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Missing ID
 *       500:
 *         description: Server error
 */

// DELETE /:table?id=1
router.delete("/:table", async (req, res) => {
    try {
        const table = req.params.table;
        const { id } = req.query;

        if (!id) return res.status(400).json({ success: false, error: "ID is required" });

        const sql = `DELETE FROM ${table} WHERE id = :id`;

        await sequelize.query(sql, {
            replacements: { id },
            type: sequelize.QueryTypes.DELETE,
        });

        res.json({ success: true });
    } catch (err) {
        console.error("Table DELETE Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
