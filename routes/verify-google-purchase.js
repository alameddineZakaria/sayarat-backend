const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const axios = require("axios");

/**
 * @swagger
 * /api/verify-google-purchase:
 *   post:
 *     summary: Verify Google Play purchase or subscription
 *     tags: [Google Play]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - purchaseToken
 *             properties:
 *               packageName:
 *                 type: string
 *                 example: "com.sayarat.app"
 *               productId:
 *                 type: string
 *                 example: "premium_upgrade"
 *               purchaseToken:
 *                 type: string
 *               isSubscription:
 *                 type: boolean
 *                 example: false
 *               acknowledge:
 *                 type: boolean
 *                 example: true
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Purchase verified
 *       400:
 *         description: Verification failed
 */
router.post("/", async (req, res) => {
  try {
    const {
      packageName = "com.sayarat.app",
      productId,
      purchaseToken,
      isSubscription = false,
      acknowledge = true,
      userId,
    } = req.body;

    if (!productId || !purchaseToken) {
      throw new Error("Product ID and purchase token are required");
    }

    const serviceAccountJson = process.env.GOOGLE_PLAY_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountJson) {
      throw new Error("Google Play service account key not configured");
    }

    const serviceAccount = JSON.parse(serviceAccountJson);

    const accessToken = await getAccessToken(serviceAccount);

    let purchaseData;
    if (isSubscription) {
      purchaseData = await verifySubscription(
        packageName,
        productId,
        purchaseToken,
        accessToken
      );
    } else {
      purchaseData = await verifyProduct(
        packageName,
        productId,
        purchaseToken,
        accessToken
      );
    }

    const isPurchased = isSubscription
      ? purchaseData.paymentState === 1 || purchaseData.paymentState === 2
      : purchaseData.purchaseState === 0;

    if (!isPurchased) {
      throw new Error("Purchase is not in a valid state");
    }

    if (acknowledge && purchaseData.acknowledgementState !== 1) {
      await acknowledgePurchase(
        packageName,
        productId,
        purchaseToken,
        accessToken,
        isSubscription
      );
    }

    let isSubscriptionActive = false;
    let expiresAt = null;

    if (isSubscription && purchaseData.expiryTimeMillis) {
      const expiresDate = new Date(Number(purchaseData.expiryTimeMillis));
      expiresAt = expiresDate.toISOString();
      isSubscriptionActive =
        expiresDate > new Date() && !purchaseData.cancelReason;
    }

    return res.json({
      valid: true,
      productId,
      orderId: purchaseData.orderId,
      purchaseTime: purchaseData.purchaseTimeMillis
        ? new Date(Number(purchaseData.purchaseTimeMillis)).toISOString()
        : null,
      acknowledged: purchaseData.acknowledgementState === 1,
      isSubscription,
      isSubscriptionActive,
      expiresAt,
      autoRenewing: purchaseData.autoRenewing,
      cancelReason: purchaseData.cancelReason,
    });
  } catch (error) {
    console.error("Google purchase verification error:", error);
    return res.status(400).json({
      valid: false,
      error: error.message,
    });
  }
});
async function getAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/androidpublisher",
    aud: serviceAccount.token_uri,
    iat: now,
    exp: now + 3600,
  };

  const jwt = signJwt(payload, serviceAccount.private_key);

  const response = await axios.post(
    serviceAccount.token_uri,
    new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }).toString(),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  return response.data.access_token;
}

function signJwt(payload, privateKey) {
  const header = { alg: "RS256", typ: "JWT" };

  const encode = obj =>
    Buffer.from(JSON.stringify(obj))
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

  const data = `${encode(header)}.${encode(payload)}`;

  const signature = crypto
    .createSign("RSA-SHA256")
    .update(data)
    .sign(privateKey, "base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return `${data}.${signature}`;
}
async function verifyProduct(packageName, productId, token, accessToken) {
  const url = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/purchases/products/${productId}/tokens/${token}`;

  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
}

async function verifySubscription(packageName, subId, token, accessToken) {
  const url = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/purchases/subscriptions/${subId}/tokens/${token}`;

  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
}
async function acknowledgePurchase(
  packageName,
  productId,
  token,
  accessToken,
  isSubscription
) {
  const type = isSubscription ? "subscriptions" : "products";

  const url = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/purchases/${type}/${productId}/tokens/${token}:acknowledge`;

  await axios.post(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
}

module.exports = router;
