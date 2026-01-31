export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const GRACE_PERIOD_DAYS = 7;
const WARNING_DAYS = [7, 3, 1]; // Send notifications at 7, 3, and 1 day before expiry

// SendGrid email function
async function sendRenewalReminderEmail(
  email: string,
  name: string,
  tier: string,
  expiryDate: string,
  daysRemaining: number,
  language: string = 'en'
) {
  const sendgridApiKey = Deno.env.get('SENDGRID_API_KEY');
  const emailFrom = Deno.env.get('EMAIL_FROM') || 'noreply@sayarat.com';
  
  if (!sendgridApiKey) {
    console.log('SendGrid API key not configured, skipping email');
    return;
  }

  const isArabic = language === 'ar';
  const tierName = tier === 'basic' ? (isArabic ? 'أساسي' : 'Basic') : 
                   tier === 'pro' ? (isArabic ? 'احترافي' : 'Pro') : 
                   (isArabic ? 'بريميوم' : 'Premium');

  const subject = daysRemaining === 1
    ? (isArabic ? 'اشتراكك ينتهي غداً!' : 'Your Subscription Expires Tomorrow!')
    : (isArabic ? `اشتراكك ينتهي خلال ${daysRemaining} أيام` : `Your Subscription Expires in ${daysRemaining} Days`);

  const formattedDate = new Date(expiryDate).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const htmlContent = `
<!DOCTYPE html>
<html dir="${isArabic ? 'rtl' : 'ltr'}" lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: ${isArabic ? "'Segoe UI', Tahoma, Arial" : "'Segoe UI', Tahoma, sans-serif"}; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #C0A062 0%, #D4B87A 100%); padding: 30px; text-align: center;">
              <h1 style="color: #000; margin: 0; font-size: 28px; font-weight: 700;">
                ${isArabic ? 'سيارات' : 'Sayarat'}
              </h1>
              <p style="color: rgba(0,0,0,0.7); margin: 5px 0 0 0; font-size: 14px;">
                ${isArabic ? 'أوتو ستايل' : 'Auto Style'}
              </p>
            </td>
          </tr>
          
          <!-- Alert Banner -->
          <tr>
            <td style="background-color: ${daysRemaining <= 3 ? '#FFF3E0' : '#E3F2FD'}; padding: 20px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 10px;">
                ${daysRemaining <= 3 ? '⚠️' : '⏰'}
              </div>
              <h2 style="color: ${daysRemaining <= 3 ? '#E65100' : '#1565C0'}; margin: 0; font-size: 22px;">
                ${daysRemaining === 1 
                  ? (isArabic ? 'ينتهي غداً!' : 'Expires Tomorrow!') 
                  : (isArabic ? `${daysRemaining} أيام متبقية` : `${daysRemaining} Days Remaining`)}
              </h2>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="color: #333; font-size: 16px; margin: 0 0 20px 0; line-height: 1.6;">
                ${isArabic 
                  ? `مرحباً ${name || 'عزيزي العميل'},` 
                  : `Hi ${name || 'Valued Customer'},`}
              </p>
              
              <p style="color: #555; font-size: 15px; margin: 0 0 20px 0; line-height: 1.6;">
                ${isArabic
                  ? `اشتراكك ${tierName} سينتهي في <strong>${formattedDate}</strong>. جدد الآن للحفاظ على وصولك إلى جميع مميزات التاجر.`
                  : `Your ${tierName} subscription will expire on <strong>${formattedDate}</strong>. Renew now to maintain access to all dealer features.`}
              </p>
              
              <!-- Subscription Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 12px; margin: 20px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                          <span style="color: #666; font-size: 14px;">${isArabic ? 'الخطة' : 'Plan'}</span>
                        </td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: ${isArabic ? 'left' : 'right'};">
                          <span style="color: #333; font-size: 14px; font-weight: 600;">${tierName}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                          <span style="color: #666; font-size: 14px;">${isArabic ? 'تاريخ الانتهاء' : 'Expiry Date'}</span>
                        </td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: ${isArabic ? 'left' : 'right'};">
                          <span style="color: #333; font-size: 14px; font-weight: 600;">${formattedDate}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #666; font-size: 14px;">${isArabic ? 'الأيام المتبقية' : 'Days Remaining'}</span>
                        </td>
                        <td style="padding: 8px 0; text-align: ${isArabic ? 'left' : 'right'};">
                          <span style="color: ${daysRemaining <= 3 ? '#E65100' : '#1565C0'}; font-size: 14px; font-weight: 600;">${daysRemaining}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- What You'll Lose -->
              <p style="color: #333; font-size: 15px; font-weight: 600; margin: 20px 0 10px 0;">
                ${isArabic ? 'ما ستفقده إذا انتهى اشتراكك:' : "What you'll lose if your subscription expires:"}
              </p>
              <ul style="color: #555; font-size: 14px; margin: 0 0 20px 0; padding-${isArabic ? 'right' : 'left'}: 20px; line-height: 1.8;">
                <li>${isArabic ? 'شارة التاجر الموثق' : 'Verified dealer badge'}</li>
                <li>${isArabic ? 'أولوية ظهور الإعلانات' : 'Priority listing placement'}</li>
                <li>${isArabic ? 'التحليلات المتقدمة' : 'Advanced analytics'}</li>
                <li>${isArabic ? 'حدود الإعلانات المرتفعة' : 'Higher listing limits'}</li>
              </ul>
              
              <!-- CTA Buttons -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://sayarat.com/subscription" style="display: inline-block; background-color: #C0A062; color: #000; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 700;">
                      ${isArabic ? 'تجديد الاشتراك' : 'Renew Subscription'}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <a href="https://sayarat.com/subscription" style="display: inline-block; color: #666; text-decoration: none; padding: 10px 20px; font-size: 14px;">
                      ${isArabic ? 'تحديث طريقة الدفع' : 'Update Payment Method'}
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Alternative Options -->
              <div style="background-color: #f0f7ff; border-radius: 8px; padding: 15px; margin-top: 20px;">
                <p style="color: #1565C0; font-size: 14px; margin: 0; line-height: 1.6;">
                  💡 ${isArabic 
                    ? 'نصيحة: يمكنك إيقاف اشتراكك مؤقتاً لمدة تصل إلى 3 أشهر بدلاً من إلغائه.'
                    : 'Tip: You can pause your subscription for up to 3 months instead of cancelling.'}
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 25px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0 0 10px 0;">
                ${isArabic ? 'سيارات أوتو ستايل - سوق السيارات الأول في لبنان' : 'Sayarat Auto Style - Lebanon\'s Premier Car Marketplace'}
              </p>
              <p style="color: #666; font-size: 11px; margin: 0;">
                ${isArabic 
                  ? 'إذا كانت لديك أي أسئلة، تواصل معنا على support@sayarat.com'
                  : 'If you have any questions, contact us at support@sayarat.com'}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sendgridApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email }] }],
        from: { email: emailFrom, name: isArabic ? 'سيارات' : 'Sayarat' },
        subject,
        content: [{ type: 'text/html', value: htmlContent }],
      }),
    });

    if (!response.ok) {
      console.error('SendGrid error:', await response.text());
    } else {
      console.log(`Renewal reminder email sent to ${email}`);
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Send push notification via Expo
async function sendPushNotification(
  pushToken: string,
  title: string,
  body: string,
  data: any
) {
  const expoAccessToken = Deno.env.get('EXPO_ACCESS_TOKEN');
  
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (expoAccessToken) {
      headers['Authorization'] = `Bearer ${expoAccessToken}`;
    }
    
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        to: pushToken,
        title,
        body,
        data,
        sound: 'default',
        badge: 1,
        priority: data.is_urgent ? 'high' : 'default',
      }),
    });
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const now = new Date();
    const notifications = [];
    const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const twilioPhoneNumber = Deno.env.get('TWILIO_PHONE_NUMBER');

    // Process each warning day
    for (const warningDay of WARNING_DAYS) {
      const targetDate = new Date(now.getTime() + warningDay * 24 * 60 * 60 * 1000);
      const startOfDay = new Date(targetDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(targetDate);
      endOfDay.setHours(23, 59, 59, 999);

      // Find subscriptions expiring on this day
      const { data: expiringSubscriptions, error: subError } = await supabase
        .from('subscriptions')
        .select(`
          id,
          user_id,
          tier,
          status,
          current_period_end,
          users:user_id (
            id,
            email,
            full_name,
            phone,
            push_token,
            language
          )
        `)
        .eq('status', 'active')
        .gte('current_period_end', startOfDay.toISOString())
        .lte('current_period_end', endOfDay.toISOString());

      if (subError) {
        console.error('Error fetching expiring subscriptions:', subError);
        continue;
      }

      for (const subscription of expiringSubscriptions || []) {
        const user = subscription.users as any;
        if (!user) continue;

        // Check if we already sent a notification for this subscription today
        const { data: existingNotification } = await supabase
          .from('notifications')
          .select('id')
          .eq('user_id', subscription.user_id)
          .eq('type', 'subscription_expiry')
          .gte('created_at', new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString())
          .single();

        if (existingNotification) {
          continue; // Already notified today
        }

        const tierName = subscription.tier === 'basic' ? 'Basic' : 
                         subscription.tier === 'pro' ? 'Pro' : 'Premium';
        const userLanguage = user.language || 'en';
        const isArabic = userLanguage === 'ar';

        const title = warningDay === 1 
          ? (isArabic ? 'اشتراكك ينتهي غداً!' : 'Subscription Expires Tomorrow!')
          : (isArabic ? `اشتراكك ينتهي خلال ${warningDay} أيام` : `Subscription Expiring in ${warningDay} Days`);
        const message = warningDay === 1
          ? (isArabic ? `اشتراكك ${tierName} ينتهي غداً. جدد الآن لتجنب انقطاع الخدمة.` : `Your ${tierName} subscription expires tomorrow. Renew now to avoid service interruption.`)
          : (isArabic ? `اشتراكك ${tierName} ينتهي خلال ${warningDay} أيام. جدد الآن للحفاظ على إعلاناتك.` : `Your ${tierName} subscription expires in ${warningDay} days. Renew now to keep your listings active.`);
        
        const titleAr = warningDay === 1 
          ? 'اشتراكك ينتهي غداً!' 
          : `اشتراكك ينتهي خلال ${warningDay} أيام`;
        const messageAr = warningDay === 1
          ? `اشتراكك ${tierName} ينتهي غداً. جدد الآن لتجنب انقطاع الخدمة.`
          : `اشتراكك ${tierName} ينتهي خلال ${warningDay} أيام. جدد الآن للحفاظ على إعلاناتك.`;

        // Create notification record
        const { error: notifError } = await supabase
          .from('notifications')
          .insert({
            user_id: subscription.user_id,
            type: 'subscription_expiry',
            title: isArabic ? titleAr : title,
            title_ar: titleAr,
            message: isArabic ? messageAr : message,
            message_ar: messageAr,
            data: {
              subscription_id: subscription.id,
              tier: subscription.tier,
              expiry_date: subscription.current_period_end,
              days_until_expiry: warningDay,
              is_urgent: warningDay <= 3,
              action_url: '/subscription',
            },
            is_read: false,
          });

        if (notifError) {
          console.error('Error creating notification:', notifError);
        }

        // Send email notification
        if (user.email) {
          await sendRenewalReminderEmail(
            user.email,
            user.full_name,
            subscription.tier,
            subscription.current_period_end,
            warningDay,
            userLanguage
          );
        }

        // Send push notification if user has push token
        if (user.push_token) {
          await sendPushNotification(
            user.push_token,
            isArabic ? titleAr : title,
            isArabic ? messageAr : message,
            {
              type: 'subscription_expiry',
              subscription_id: subscription.id,
              days_until_expiry: warningDay,
              is_urgent: warningDay <= 3,
              action_url: '/subscription',
            }
          );
        }

        // Send SMS notification for urgent warnings (3 days or less)
        if (warningDay <= 3 && user.phone && twilioAccountSid && twilioAuthToken && twilioPhoneNumber) {
          try {
            const smsMessage = warningDay === 1
              ? `URGENT: Your ${tierName} subscription on Sayarat expires TOMORROW. Renew now to keep your listings active.`
              : `Your ${tierName} subscription on Sayarat expires in ${warningDay} days. Renew now to avoid service interruption.`;
            
            const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
            const auth = btoa(`${twilioAccountSid}:${twilioAuthToken}`);
            
            await fetch(twilioUrl, {
              method: 'POST',
              headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                To: user.phone,
                From: twilioPhoneNumber,
                Body: smsMessage,
              }),
            });
          } catch (smsError) {
            console.error('Error sending SMS:', smsError);
          }
        }

        notifications.push({
          user_id: subscription.user_id,
          subscription_id: subscription.id,
          days_until_expiry: warningDay,
          email_sent: !!user.email,
          push_sent: !!user.push_token,
          sms_sent: warningDay <= 3 && !!user.phone,
        });
      }
    }

    // Check for expired subscriptions that need to enter grace period
    const { data: expiredSubscriptions, error: expiredError } = await supabase
      .from('subscriptions')
      .select(`
        id, 
        user_id, 
        tier,
        current_period_end,
        users:user_id (
          id,
          email,
          full_name,
          push_token,
          language
        )
      `)
      .eq('status', 'active')
      .lt('current_period_end', now.toISOString());

    if (!expiredError && expiredSubscriptions) {
      for (const subscription of expiredSubscriptions) {
        const user = subscription.users as any;
        const expiryDate = new Date(subscription.current_period_end);
        const daysSinceExpiry = Math.ceil((now.getTime() - expiryDate.getTime()) / (1000 * 60 * 60 * 24));
        const gracePeriodRemaining = GRACE_PERIOD_DAYS - daysSinceExpiry;
        const userLanguage = user?.language || 'en';
        const isArabic = userLanguage === 'ar';
        
        if (daysSinceExpiry <= GRACE_PERIOD_DAYS) {
          // Update status to past_due (grace period)
          await supabase
            .from('subscriptions')
            .update({ status: 'past_due' })
            .eq('id', subscription.id);

          // Log grace period start event
          await supabase.from('subscription_events').insert({
            user_id: subscription.user_id,
            event_type: 'grace_period_start',
            event_data: {
              subscription_id: subscription.id,
              tier: subscription.tier,
              days_remaining: gracePeriodRemaining,
            },
          });

          // Send grace period notification
          if (daysSinceExpiry === 1) {
            const tierName = subscription.tier === 'basic' ? 'Basic' : 
                             subscription.tier === 'pro' ? 'Pro' : 'Premium';

            await supabase.from('notifications').insert({
              user_id: subscription.user_id,
              type: 'subscription_expiry',
              title: isArabic ? 'بدأت فترة السماح' : 'Grace Period Started',
              title_ar: 'بدأت فترة السماح',
              message: isArabic 
                ? `انتهى اشتراكك ${tierName}. لديك ${gracePeriodRemaining} أيام للتجديد قبل إخفاء إعلاناتك.`
                : `Your ${tierName} subscription has expired. You have ${gracePeriodRemaining} days to renew before your listings are hidden.`,
              message_ar: `انتهى اشتراكك ${tierName}. لديك ${gracePeriodRemaining} أيام للتجديد قبل إخفاء إعلاناتك.`,
              data: {
                subscription_id: subscription.id,
                tier: subscription.tier,
                grace_period_remaining: gracePeriodRemaining,
                is_grace_period: true,
                action_url: '/subscription',
              },
              is_read: false,
            });

            // Send push notification
            if (user?.push_token) {
              await sendPushNotification(
                user.push_token,
                isArabic ? 'بدأت فترة السماح' : 'Grace Period Started',
                isArabic 
                  ? `انتهى اشتراكك. ${gracePeriodRemaining} أيام متبقية للتجديد.`
                  : `Your subscription has expired. ${gracePeriodRemaining} days left to renew.`,
                { 
                  type: 'grace_period', 
                  subscription_id: subscription.id,
                  is_urgent: true,
                  action_url: '/subscription',
                }
              );
            }
          }
        } else {
          // Grace period expired - update status to expired and hide listings
          await supabase
            .from('subscriptions')
            .update({ status: 'expired' })
            .eq('id', subscription.id);

          // Hide user's listings
          const { data: hiddenListings } = await supabase
            .from('vehicles')
            .update({ status: 'hidden', hidden_reason: 'subscription_expired' })
            .eq('user_id', subscription.user_id)
            .eq('status', 'active')
            .select('id');

          // Log grace period end event
          await supabase.from('subscription_events').insert({
            user_id: subscription.user_id,
            event_type: 'grace_period_end',
            event_data: {
              subscription_id: subscription.id,
              tier: subscription.tier,
              listings_hidden: hiddenListings?.length || 0,
            },
          });

          // Send final notification
          const tierName = subscription.tier === 'basic' ? 'Basic' : 
                           subscription.tier === 'pro' ? 'Pro' : 'Premium';

          await supabase.from('notifications').insert({
            user_id: subscription.user_id,
            type: 'subscription_expiry',
            title: isArabic ? 'انتهى الاشتراك - تم إخفاء الإعلانات' : 'Subscription Expired - Listings Hidden',
            title_ar: 'انتهى الاشتراك - تم إخفاء الإعلانات',
            message: isArabic
              ? `انتهت فترة السماح لاشتراكك ${tierName}. تم إخفاء ${hiddenListings?.length || 0} إعلان. جدد لإعادة تفعيلها.`
              : `Your ${tierName} subscription grace period has ended. Your ${hiddenListings?.length || 0} listings are now hidden. Renew to reactivate them.`,
            message_ar: `انتهت فترة السماح لاشتراكك ${tierName}. تم إخفاء ${hiddenListings?.length || 0} إعلان. جدد لإعادة تفعيلها.`,
            data: {
              subscription_id: subscription.id,
              tier: subscription.tier,
              listings_hidden: hiddenListings?.length || 0,
              is_expired: true,
              action_url: '/subscription',
            },
            is_read: false,
          });
        }
      }
    }

    // Also check for subscriptions in grace period and send daily reminders
    const { data: gracePeriodSubs } = await supabase
      .from('subscriptions')
      .select(`
        id, 
        user_id, 
        tier,
        current_period_end,
        users:user_id (push_token, email, full_name, language)
      `)
      .eq('status', 'past_due');

    if (gracePeriodSubs) {
      for (const subscription of gracePeriodSubs) {
        const user = subscription.users as any;
        const expiryDate = new Date(subscription.current_period_end);
        const daysSinceExpiry = Math.ceil((now.getTime() - expiryDate.getTime()) / (1000 * 60 * 60 * 24));
        const gracePeriodRemaining = GRACE_PERIOD_DAYS - daysSinceExpiry;
        const userLanguage = user?.language || 'en';
        const isArabic = userLanguage === 'ar';

        if (gracePeriodRemaining > 0 && gracePeriodRemaining <= 3) {
          // Send daily reminder during last 3 days of grace period
          const { data: existingReminder } = await supabase
            .from('notifications')
            .select('id')
            .eq('user_id', subscription.user_id)
            .eq('type', 'subscription_expiry')
            .gte('created_at', new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString())
            .single();

          if (!existingReminder) {
            const tierName = subscription.tier === 'basic' ? 'Basic' : 
                             subscription.tier === 'pro' ? 'Pro' : 'Premium';

            const title = isArabic 
              ? `${gracePeriodRemaining} يوم متبقي!`
              : `${gracePeriodRemaining} Day${gracePeriodRemaining !== 1 ? 's' : ''} Left!`;
            const message = isArabic
              ? `متبقي ${gracePeriodRemaining} يوم فقط في فترة السماح. جدد اشتراكك ${tierName} الآن للحفاظ على ظهور إعلاناتك.`
              : `Only ${gracePeriodRemaining} day${gracePeriodRemaining !== 1 ? 's' : ''} left in your grace period. Renew your ${tierName} subscription now to keep your listings visible.`;

            await supabase.from('notifications').insert({
              user_id: subscription.user_id,
              type: 'subscription_expiry',
              title,
              title_ar: `${gracePeriodRemaining} يوم متبقي!`,
              message,
              message_ar: `متبقي ${gracePeriodRemaining} يوم فقط في فترة السماح. جدد اشتراكك ${tierName} الآن للحفاظ على ظهور إعلاناتك.`,
              data: {
                subscription_id: subscription.id,
                tier: subscription.tier,
                grace_period_remaining: gracePeriodRemaining,
                is_grace_period: true,
                is_urgent: true,
                action_url: '/subscription',
              },
              is_read: false,
            });

            if (user?.push_token) {
              await sendPushNotification(
                user.push_token,
                title,
                isArabic ? 'جدد الآن للحفاظ على ظهور إعلاناتك.' : 'Renew now to keep your listings visible.',
                { 
                  type: 'grace_period_urgent', 
                  subscription_id: subscription.id,
                  is_urgent: true,
                  action_url: '/subscription',
                }
              );
            }
          }
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        notifications_sent: notifications.length,
        notifications,
      }),
      {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error) {
    console.error('Error in check-subscription-expiry:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});
