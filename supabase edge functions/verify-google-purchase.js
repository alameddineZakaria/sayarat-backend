export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

interface GoogleServiceAccountKey {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

interface GooglePurchaseResponse {
  purchaseTimeMillis?: string;
  purchaseState?: number;
  consumptionState?: number;
  developerPayload?: string;
  orderId?: string;
  acknowledgementState?: number;
  kind?: string;
  // For subscriptions
  startTimeMillis?: string;
  expiryTimeMillis?: string;
  autoRenewing?: boolean;
  paymentState?: number;
  cancelReason?: number;
}

// Get access token using service account
async function getAccessToken(serviceAccountKey: GoogleServiceAccountKey): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 3600; // Token valid for 1 hour

  // Create JWT header
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  // Create JWT claim set
  const claimSet = {
    iss: serviceAccountKey.client_email,
    scope: 'https://www.googleapis.com/auth/androidpublisher',
    aud: serviceAccountKey.token_uri,
    iat: now,
    exp: exp,
  };

  // Base64url encode
  const base64urlEncode = (obj: object) => {
    const json = JSON.stringify(obj);
    const base64 = btoa(json);
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };

  const headerEncoded = base64urlEncode(header);
  const claimSetEncoded = base64urlEncode(claimSet);
  const signatureInput = `${headerEncoded}.${claimSetEncoded}`;

  // Sign with private key
  const privateKey = serviceAccountKey.private_key;
  const encoder = new TextEncoder();
  const data = encoder.encode(signatureInput);

  // Import the private key
  const pemHeader = '-----BEGIN PRIVATE KEY-----';
  const pemFooter = '-----END PRIVATE KEY-----';
  const pemContents = privateKey.replace(pemHeader, '').replace(pemFooter, '').replace(/\s/g, '');
  const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryDer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, data);
  const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const jwt = `${signatureInput}.${signatureBase64}`;

  // Exchange JWT for access token
  const tokenResponse = await fetch(serviceAccountKey.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenResponse.json();
  if (!tokenResponse.ok) {
    throw new Error(`Failed to get access token: ${tokenData.error_description || tokenData.error}`);
  }

  return tokenData.access_token;
}

// Verify a one-time product purchase
async function verifyProductPurchase(
  packageName: string,
  productId: string,
  purchaseToken: string,
  accessToken: string
): Promise<GooglePurchaseResponse> {
  const url = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/purchases/products/${productId}/tokens/${purchaseToken}`;
  
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Google API error: ${error.error?.message || 'Unknown error'}`);
  }

  return response.json();
}

// Verify a subscription purchase
async function verifySubscriptionPurchase(
  packageName: string,
  subscriptionId: string,
  purchaseToken: string,
  accessToken: string
): Promise<GooglePurchaseResponse> {
  const url = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/purchases/subscriptions/${subscriptionId}/tokens/${purchaseToken}`;
  
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Google API error: ${error.error?.message || 'Unknown error'}`);
  }

  return response.json();
}

// Acknowledge a purchase (required for consumables)
async function acknowledgePurchase(
  packageName: string,
  productId: string,
  purchaseToken: string,
  accessToken: string,
  isSubscription: boolean
): Promise<void> {
  const endpoint = isSubscription ? 'subscriptions' : 'products';
  const url = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/purchases/${endpoint}/${productId}/tokens/${purchaseToken}:acknowledge`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  if (!response.ok && response.status !== 204) {
    const error = await response.json();
    throw new Error(`Failed to acknowledge purchase: ${error.error?.message || 'Unknown error'}`);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const serviceAccountKeyJson = Deno.env.get('GOOGLE_PLAY_SERVICE_ACCOUNT_KEY');
    if (!serviceAccountKeyJson) {
      throw new Error('Google Play service account key not configured');
    }

    let serviceAccountKey: GoogleServiceAccountKey;
    try {
      serviceAccountKey = JSON.parse(serviceAccountKeyJson);
    } catch {
      throw new Error('Invalid service account key format');
    }

    const { 
      packageName, 
      productId, 
      purchaseToken, 
      isSubscription = false,
      acknowledge = true,
      userId 
    } = await req.json();

    // Use default package name if not provided
    const appPackageName = packageName || 'com.sayarat.app';

    if (!productId || !purchaseToken) {
      throw new Error('Product ID and purchase token are required');
    }

    // Get access token
    const accessToken = await getAccessToken(serviceAccountKey);

    // Verify the purchase
    let purchaseData: GooglePurchaseResponse;
    
    if (isSubscription) {
      purchaseData = await verifySubscriptionPurchase(
        appPackageName,
        productId,
        purchaseToken,
        accessToken
      );
    } else {
      purchaseData = await verifyProductPurchase(
        appPackageName,
        productId,
        purchaseToken,
        accessToken
      );
    }

    // Check purchase state
    // For products: 0 = Purchased, 1 = Canceled, 2 = Pending
    // For subscriptions: paymentState 0 = Pending, 1 = Received, 2 = Free trial, 3 = Pending deferred upgrade/downgrade
    const isPurchased = isSubscription 
      ? (purchaseData.paymentState === 1 || purchaseData.paymentState === 2)
      : purchaseData.purchaseState === 0;

    if (!isPurchased) {
      throw new Error('Purchase is not in a valid state');
    }

    // Acknowledge the purchase if requested and not already acknowledged
    if (acknowledge && purchaseData.acknowledgementState !== 1) {
      await acknowledgePurchase(
        appPackageName,
        productId,
        purchaseToken,
        accessToken,
        isSubscription
      );
    }

    // Determine subscription status
    let isSubscriptionActive = false;
    let expiresAt = null;

    if (isSubscription && purchaseData.expiryTimeMillis) {
      const expiresDate = new Date(parseInt(purchaseData.expiryTimeMillis));
      expiresAt = expiresDate.toISOString();
      isSubscriptionActive = expiresDate > new Date() && !purchaseData.cancelReason;
    }

    // Return verification result
    return new Response(JSON.stringify({
      valid: true,
      productId,
      orderId: purchaseData.orderId,
      purchaseTime: purchaseData.purchaseTimeMillis 
        ? new Date(parseInt(purchaseData.purchaseTimeMillis)).toISOString() 
        : null,
      purchaseState: purchaseData.purchaseState,
      consumptionState: purchaseData.consumptionState,
      acknowledged: purchaseData.acknowledgementState === 1,
      isSubscription,
      isSubscriptionActive,
      expiresAt,
      autoRenewing: purchaseData.autoRenewing,
      cancelReason: purchaseData.cancelReason,
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Google purchase verification error:', error);
    return new Response(JSON.stringify({
      valid: false,
      error: error.message,
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});
