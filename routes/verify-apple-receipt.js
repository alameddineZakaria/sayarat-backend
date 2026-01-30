const express = require("express");
const router = express.Router();
const axios = require("axios");

/**
 * @swagger
 * /api/verify-apple-receipt:
 *   post:
 *     summary: Verify Apple App Store receipt
 *     tags: [Apple Store]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiptData
 *             properties:
 *               receiptData:
 *                 type: string
 *               productId:
 *                 type: string
 *               transactionId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Receipt verified
 *       400:
 *         description: Verification failed
 */
router.post("/", async (req, res) => {
    try {
        const { receiptData, productId, transactionId, userId } = req.body;

        if (!receiptData) {
            throw new Error("Receipt data is required");
        }

        const sharedSecret = process.env.APPLE_SHARED_SECRET;
        if (!sharedSecret) {
            throw new Error("Apple shared secret not configured");
        }

        // First try production
        let result = await verifyWithApple(receiptData, sharedSecret, false);

        // Sandbox fallback
        if (result.status === 21007) {
            result = await verifyWithApple(receiptData, sharedSecret, true);
        }

        if (result.status !== 0) {
            const message = APPLE_STATUS[result.status] || "Unknown Apple error";
            throw new Error(`Apple verification failed: ${message}`);
        }

        const allTransactions = [
            ...(result.receipt?.in_app || []),
            ...(result.latest_receipt_info || []),
        ];

        let matchedTransaction = null;

        if (transactionId) {
            matchedTransaction = allTransactions.find(
                t => t.transaction_id === transactionId
            );
        } else if (productId) {
            matchedTransaction = allTransactions
                .filter(t => t.product_id === productId)
                .sort(
                    (a, b) =>
                        Number(b.purchase_date_ms) - Number(a.purchase_date_ms)
                )[0];
        }

        if (!matchedTransaction && productId) {
            throw new Error(`No transaction found for product ${productId}`);
        }

        let isSubscriptionActive = false;
        let expiresAt = null;

        if (matchedTransaction?.expires_date_ms) {
            const expiresDate = new Date(
                Number(matchedTransaction.expires_date_ms)
            );
            expiresAt = expiresDate.toISOString();
            isSubscriptionActive = expiresDate > new Date();
        }

        return res.json({
            valid: true,
            environment: result.environment,
            bundleId: result.receipt?.bundle_id,
            transaction: matchedTransaction
                ? {
                    productId: matchedTransaction.product_id,
                    transactionId: matchedTransaction.transaction_id,
                    originalTransactionId:
                        matchedTransaction.original_transaction_id,
                    purchaseDate: new Date(
                        Number(matchedTransaction.purchase_date_ms)
                    ).toISOString(),
                    expiresAt,
                    isTrialPeriod:
                        matchedTransaction.is_trial_period === "true",
                }
                : null,
            isSubscriptionActive,
            allTransactions: allTransactions.map(t => ({
                productId: t.product_id,
                transactionId: t.transaction_id,
                purchaseDate: new Date(
                    Number(t.purchase_date_ms)
                ).toISOString(),
                expiresAt: t.expires_date_ms
                    ? new Date(Number(t.expires_date_ms)).toISOString()
                    : null,
            })),
        });
    } catch (error) {
        console.error("Apple receipt verification error:", error);
        return res.status(400).json({
            valid: false,
            error: error.message,
        });
    }
});

async function verifyWithApple(
    receiptData,
    sharedSecret,
    useSandbox = false
) {
    const url = useSandbox
        ? APPLE_SANDBOX_URL
        : APPLE_PRODUCTION_URL;

    const { data } = await axios.post(url, {
        "receipt-data": receiptData,
        password: sharedSecret,
        "exclude-old-transactions": true,
    });

    return data;
}


module.exports = router;
