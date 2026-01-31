
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

interface ExpoPushMessage {
  to: string;
  sound: 'default' | null;
  title: string;
  body: string;
  data: Record<string, any>;
  channelId: string;
  priority: 'default' | 'normal' | 'high';
  badge?: number;
}

async function sendPushNotifications(supabaseUrl: string, supabaseKey: string, userId: string, title: string, body: string, data: Record<string, any>) {
  try {
    // Get user's push tokens
    const tokensResponse = await fetch(
      `${supabaseUrl}/rest/v1/push_tokens?user_id=eq.${userId}&is_active=eq.true&select=token`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      }
    );

    if (!tokensResponse.ok) return { sent: 0 };

    const tokens = await tokensResponse.json();
    if (!tokens || tokens.length === 0) return { sent: 0 };

    const messages: ExpoPushMessage[] = tokens.map((t: { token: string }) => ({
      to: t.token,
      sound: 'default',
      title,
      body,
      data: {
        ...data,
        timestamp: new Date().toISOString(),
      },
      channelId: 'offers',
      priority: 'high',
    }));

    const expoPushResponse = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages),
    });

    if (expoPushResponse.ok) {
      const result = await expoPushResponse.json();
      return { sent: result.data?.filter((r: any) => r.status === 'ok').length || 0 };
    }
    return { sent: 0 };
  } catch (error) {
    console.error('Push notification error:', error);
    return { sent: 0 };
  }
}

async function sendEmailNotification(supabaseUrl: string, supabaseKey: string, userId: string, subject: string, body: string) {
  try {
    // Get user's email
    const userResponse = await fetch(
      `${supabaseUrl}/rest/v1/profiles?id=eq.${userId}&select=email,full_name`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      }
    );

    if (!userResponse.ok) return { sent: false };

    const users = await userResponse.json();
    if (!users || users.length === 0 || !users[0].email) return { sent: false };

    const user = users[0];
    const sendgridApiKey = Deno.env.get('SENDGRID_API_KEY');
    const emailFrom = Deno.env.get('EMAIL_FROM');

    if (!sendgridApiKey || !emailFrom) return { sent: false };

    const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sendgridApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: user.email, name: user.full_name || 'User' }],
        }],
        from: { email: emailFrom, name: 'AutoMarket' },
        subject,
        content: [{
          type: 'text/html',
          value: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); padding: 20px; text-align: center;">
                <h1 style="color: #000; margin: 0;">AutoMarket</h1>
              </div>
              <div style="padding: 30px; background: #1a1a1a; color: #fff;">
                <h2 style="color: #D4AF37;">${subject}</h2>
                <p style="font-size: 16px; line-height: 1.6;">${body}</p>
                <a href="https://automarket.app/offers" style="display: inline-block; background: #D4AF37; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px; font-weight: bold;">View Offers</a>
              </div>
              <div style="padding: 20px; background: #0a0a0a; text-align: center; color: #666;">
                <p style="margin: 0; font-size: 12px;">© 2026 AutoMarket. All rights reserved.</p>
              </div>
            </div>
          `,
        }],
      }),
    });

    return { sent: emailResponse.ok };
  } catch (error) {
    console.error('Email notification error:', error);
    return { sent: false };
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }

    const now = new Date();
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    console.log('Checking for expiring offers at:', now.toISOString());

    // 1. Find offers expiring within 24 hours that haven't been reminded
    const expiringResponse = await fetch(
      `${supabaseUrl}/rest/v1/offers?status=in.(pending,countered)&expires_at=gt.${now.toISOString()}&expires_at=lte.${in24Hours.toISOString()}&expiry_reminder_sent=eq.false&select=id,buyer_id,seller_id,offer_amount,counter_amount,status,expires_at,vehicle_id`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      }
    );

    if (!expiringResponse.ok) {
      const errorText = await expiringResponse.text();
      console.error('Error fetching expiring offers:', errorText);
    }

    const expiringOffers = expiringResponse.ok ? await expiringResponse.json() : [];
    console.log('Expiring offers found:', expiringOffers?.length || 0);

    const reminderResults: Array<{offerId: string, buyerPush: number, sellerPush: number, buyerEmail: boolean, sellerEmail: boolean, hoursLeft: number}> = [];
    
    for (const offer of expiringOffers || []) {
      const amount = offer.counter_amount || offer.offer_amount || 0;
      const hoursLeft = Math.round((new Date(offer.expires_at).getTime() - now.getTime()) / (1000 * 60 * 60));

      // Get vehicle info for notification
      let vehicleTitle = 'your vehicle';
      const vehicleResponse = await fetch(
        `${supabaseUrl}/rest/v1/vehicles?id=eq.${offer.vehicle_id}&select=title,make,model,year`,
        {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
          },
        }
      );
      if (vehicleResponse.ok) {
        const vehicles = await vehicleResponse.json();
        if (vehicles && vehicles.length > 0) {
          const v = vehicles[0];
          vehicleTitle = v.title || `${v.year} ${v.make} ${v.model}`;
        }
      }

      // Notification content for buyer
      const buyerTitle = 'Offer Expiring Soon!';
      const buyerBody = `Your offer of $${amount.toLocaleString()} on ${vehicleTitle} expires in ${hoursLeft} hours. The seller hasn't responded yet.`;
      
      // Notification content for seller
      const sellerTitle = 'Action Required: Offer Expiring!';
      const sellerBody = `An offer of $${amount.toLocaleString()} on ${vehicleTitle} expires in ${hoursLeft} hours. Respond now before it's too late!`;

      // Send push notifications
      const buyerPush = await sendPushNotifications(supabaseUrl, supabaseKey, offer.buyer_id, buyerTitle, buyerBody, {
        type: 'offer_expiring',
        offerId: offer.id,
        url: `/offer-chat/${offer.id}`,
      });

      let sellerPush = { sent: 0 };
      if (offer.status === 'pending') {
        sellerPush = await sendPushNotifications(supabaseUrl, supabaseKey, offer.seller_id, sellerTitle, sellerBody, {
          type: 'offer_expiring',
          offerId: offer.id,
          url: `/offer-chat/${offer.id}`,
        });
      }

      // Send email notifications
      const buyerEmail = await sendEmailNotification(supabaseUrl, supabaseKey, offer.buyer_id, buyerTitle, buyerBody);
      let sellerEmail = { sent: false };
      if (offer.status === 'pending') {
        sellerEmail = await sendEmailNotification(supabaseUrl, supabaseKey, offer.seller_id, sellerTitle, sellerBody);
      }

      // Create in-app notification for buyer
      await fetch(`${supabaseUrl}/rest/v1/offer_notifications`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          user_id: offer.buyer_id,
          offer_id: offer.id,
          type: 'offer_expiring',
          title: buyerTitle,
          body: buyerBody,
          amount,
          is_read: false
        }),
      });

      // Create in-app notification for seller if pending
      if (offer.status === 'pending') {
        await fetch(`${supabaseUrl}/rest/v1/offer_notifications`, {
          method: 'POST',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            user_id: offer.seller_id,
            offer_id: offer.id,
            type: 'offer_expiring',
            title: sellerTitle,
            body: sellerBody,
            amount,
            is_read: false
          }),
        });
      }

      // Mark reminder as sent
      await fetch(`${supabaseUrl}/rest/v1/offers?id=eq.${offer.id}`, {
        method: 'PATCH',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ expiry_reminder_sent: true }),
      });

      reminderResults.push({
        offerId: offer.id,
        buyerPush: buyerPush.sent,
        sellerPush: sellerPush.sent,
        buyerEmail: buyerEmail.sent,
        sellerEmail: sellerEmail.sent,
        hoursLeft
      });
    }

    // 2. Find and expire offers that have passed their expiration date
    const expiredResponse = await fetch(
      `${supabaseUrl}/rest/v1/offers?status=in.(pending,countered)&expires_at=lt.${now.toISOString()}&expired_notification_sent=eq.false&select=id,buyer_id,seller_id,offer_amount,counter_amount,status,vehicle_id`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      }
    );

    const expiredOffers = expiredResponse.ok ? await expiredResponse.json() : [];
    console.log('Expired offers found:', expiredOffers?.length || 0);

    const expiredResults: Array<{offerId: string, previousStatus: string, buyerPush: number, sellerPush: number}> = [];
    
    for (const offer of expiredOffers || []) {
      const amount = offer.counter_amount || offer.offer_amount || 0;

      // Get vehicle info
      let vehicleTitle = 'the vehicle';
      const vehicleResponse = await fetch(
        `${supabaseUrl}/rest/v1/vehicles?id=eq.${offer.vehicle_id}&select=title,make,model,year`,
        {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
          },
        }
      );
      if (vehicleResponse.ok) {
        const vehicles = await vehicleResponse.json();
        if (vehicles && vehicles.length > 0) {
          const v = vehicles[0];
          vehicleTitle = v.title || `${v.year} ${v.make} ${v.model}`;
        }
      }

      // Update offer status to expired
      await fetch(`${supabaseUrl}/rest/v1/offers?id=eq.${offer.id}`, {
        method: 'PATCH',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ 
          status: 'expired',
          expired_notification_sent: true,
          updated_at: now.toISOString()
        }),
      });

      // Create system message in offer chat
      await fetch(`${supabaseUrl}/rest/v1/offer_messages`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          offer_id: offer.id,
          sender_id: offer.buyer_id,
          message: 'This offer has expired. You can submit a new offer if you\'re still interested.',
          message_type: 'system'
        }),
      });

      // Notification content
      const buyerTitle = 'Offer Expired';
      const buyerBody = `Your offer of $${amount.toLocaleString()} on ${vehicleTitle} has expired. Submit a new offer if you're still interested!`;
      const sellerTitle = 'Offer Expired';
      const sellerBody = `An offer of $${amount.toLocaleString()} on ${vehicleTitle} has expired without a response.`;

      // Send push notifications
      const buyerPush = await sendPushNotifications(supabaseUrl, supabaseKey, offer.buyer_id, buyerTitle, buyerBody, {
        type: 'offer_expired',
        offerId: offer.id,
        url: `/offer-chat/${offer.id}`,
      });

      const sellerPush = await sendPushNotifications(supabaseUrl, supabaseKey, offer.seller_id, sellerTitle, sellerBody, {
        type: 'offer_expired',
        offerId: offer.id,
        url: `/seller/offers`,
      });

      // Send email notifications
      await sendEmailNotification(supabaseUrl, supabaseKey, offer.buyer_id, buyerTitle, buyerBody);
      await sendEmailNotification(supabaseUrl, supabaseKey, offer.seller_id, sellerTitle, sellerBody);

      // Create in-app notifications
      await fetch(`${supabaseUrl}/rest/v1/offer_notifications`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          user_id: offer.buyer_id,
          offer_id: offer.id,
          type: 'offer_expired',
          title: buyerTitle,
          body: buyerBody,
          amount,
          is_read: false
        }),
      });

      await fetch(`${supabaseUrl}/rest/v1/offer_notifications`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          user_id: offer.seller_id,
          offer_id: offer.id,
          type: 'offer_expired',
          title: sellerTitle,
          body: sellerBody,
          amount,
          is_read: false
        }),
      });

      expiredResults.push({
        offerId: offer.id,
        previousStatus: offer.status,
        buyerPush: buyerPush.sent,
        sellerPush: sellerPush.sent
      });
    }

    const summary = {
      success: true,
      timestamp: now.toISOString(),
      remindersCount: reminderResults.length,
      expiredCount: expiredResults.length,
      reminders: reminderResults,
      expired: expiredResults,
      totalPushSent: reminderResults.reduce((sum, r) => sum + r.buyerPush + r.sellerPush, 0) + 
                     expiredResults.reduce((sum, r) => sum + r.buyerPush + r.sellerPush, 0),
    };

    console.log('Summary:', JSON.stringify(summary));

    return new Response(JSON.stringify(summary), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in check-expiring-offers:', errorMessage);
    return new Response(JSON.stringify({ 
      error: errorMessage,
      success: false 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
});
