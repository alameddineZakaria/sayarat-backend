export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

// Apple's verification endpoints
const APPLE_PRODUCTION_URL = 'https://buy.itunes.apple.com/verifyReceipt';
const APPLE_SANDBOX_URL = 'https://sandbox.itunes.apple.com/verifyReceipt';

interface AppleReceiptResponse {
  status: number;
  environment?: string;
  receipt?: {
    bundle_id: string;
    in_app: Array<{
      product_id: string;
      transaction_id: string;
      original_transaction_id: string;
      purchase_date_ms: string;
      expires_date_ms?: string;
      is_trial_period?: string;
    }>;
  };
  latest_receipt_info?: Array<{
    product_id: string;
    transaction_id: string;
    original_transaction_id: string;
    purchase_date_ms: string;
    expires_date_ms?: string;
    is_trial_period?: string;
  }>;
}

// Status codes from Apple
const APPLE_STATUS = {
  0: 'Valid receipt',
  21000: 'App Store could not read the JSON object',
  21002: 'Receipt data malformed',
  21003: 'Receipt could not be authenticated',
  21004: 'Shared secret does not match',
  21005: 'Receipt server unavailable',
  21006: 'Receipt valid but subscription expired',
  21007: 'Receipt is from sandbox, use sandbox URL',
  21008: 'Receipt is from production, use production URL',
  21010: 'This receipt could not be authorized',
};

async function verifyWithApple(receiptData: string, sharedSecret: string, useSandbox: boolean = false): Promise<AppleReceiptResponse> {
  const url = useSandbox ? APPLE_SANDBOX_URL : APPLE_PRODUCTION_URL;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'receipt-data': receiptData,
      'password': sharedSecret,
      'exclude-old-transactions': true,
    }),
  });

  return response.json();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const sharedSecret = Deno.env.get('APPLE_SHARED_SECRET');
    if (!sharedSecret) {
      throw new Error('Apple shared secret not configured');
    }

    const { receiptData, userId, productId, transactionId } = await req.json();

    if (!receiptData) {
      throw new Error('Receipt data is required');
    }

    // First try production
    let result = await verifyWithApple(receiptData, sharedSecret, false);

    // If status 21007, receipt is from sandbox - retry with sandbox URL
    if (result.status === 21007) {
      result = await verifyWithApple(receiptData, sharedSecret, true);
    }

    // Check for valid status
    if (result.status !== 0) {
      const errorMessage = APPLE_STATUS[result.status as keyof typeof APPLE_STATUS] || 'Unknown error';
      throw new Error(`Apple verification failed: ${errorMessage} (status: ${result.status})`);
    }

    // Find the specific transaction
    const allTransactions = [
      ...(result.receipt?.in_app || []),
      ...(result.latest_receipt_info || []),
    ];

    let matchedTransaction = null;
    
    if (transactionId) {
      matchedTransaction = allTransactions.find(t => t.transaction_id === transactionId);
    } else if (productId) {
      // Find the most recent transaction for this product
      matchedTransaction = allTransactions
        .filter(t => t.product_id === productId)
        .sort((a, b) => parseInt(b.purchase_date_ms) - parseInt(a.purchase_date_ms))[0];
    }

    if (!matchedTransaction && productId) {
      throw new Error(`No transaction found for product: ${productId}`);
    }

    // Determine if this is a subscription and if it's still valid
    let isSubscriptionActive = false;
    let expiresAt = null;

    if (matchedTransaction?.expires_date_ms) {
      const expiresDate = new Date(parseInt(matchedTransaction.expires_date_ms));
      expiresAt = expiresDate.toISOString();
      isSubscriptionActive = expiresDate > new Date();
    }

    // Return verification result
    return new Response(JSON.stringify({
      valid: true,
      environment: result.environment,
      bundleId: result.receipt?.bundle_id,
      transaction: matchedTransaction ? {
        productId: matchedTransaction.product_id,
        transactionId: matchedTransaction.transaction_id,
        originalTransactionId: matchedTransaction.original_transaction_id,
        purchaseDate: new Date(parseInt(matchedTransaction.purchase_date_ms)).toISOString(),
        expiresAt,
        isTrialPeriod: matchedTransaction.is_trial_period === 'true',
      } : null,
      isSubscriptionActive,
      allTransactions: allTransactions.map(t => ({
        productId: t.product_id,
        transactionId: t.transaction_id,
        purchaseDate: new Date(parseInt(t.purchase_date_ms)).toISOString(),
        expiresAt: t.expires_date_ms ? new Date(parseInt(t.expires_date_ms)).toISOString() : null,
      })),
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Apple receipt verification error:', error);
    return new Response(JSON.stringify({
      valid: false,
      error: error.message,
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});
