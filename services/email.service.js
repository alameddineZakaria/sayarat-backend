import fetch from "node-fetch";

/**
 * Send subscription renewal reminder email via SendGrid
 */
export async function sendRenewalReminderEmail({
  email,
  name,
  tier,
  expiryDate,
  daysRemaining,
  language = "en",
}) {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@sayarat.com";

  if (!SENDGRID_API_KEY) {
    console.warn("⚠️ SendGrid API key not configured, email skipped");
    return;
  }

  const isArabic = language === "ar";

  const tierName =
    tier === "basic"
      ? isArabic ? "أساسي" : "Basic"
      : tier === "pro"
      ? isArabic ? "احترافي" : "Pro"
      : isArabic ? "بريميوم" : "Premium";

  const subject =
    daysRemaining === 1
      ? isArabic
        ? "اشتراكك ينتهي غداً!"
        : "Your Subscription Expires Tomorrow!"
      : isArabic
      ? `اشتراكك ينتهي خلال ${daysRemaining} أيام`
      : `Your Subscription Expires in ${daysRemaining} Days`;

  const formattedDate = new Date(expiryDate).toLocaleDateString(
    isArabic ? "ar-SA" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const htmlContent = buildEmailTemplate({
    isArabic,
    name,
    tierName,
    formattedDate,
    daysRemaining,
  });

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email }],
          },
        ],
        from: {
          email: EMAIL_FROM,
          name: isArabic ? "سيارات" : "Sayarat",
        },
        subject,
        content: [{ type: "text/html", value: htmlContent }],
      }),
    });

    if (!response.ok) {
      console.error("❌ SendGrid error:", await response.text());
    } else {
      console.log(`✅ Renewal reminder email sent to ${email}`);
    }
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

/**
 * Email HTML template builder
 */
function buildEmailTemplate({
  isArabic,
  name,
  tierName,
  formattedDate,
  daysRemaining,
}) {
  return `
<!DOCTYPE html>
<html lang="${isArabic ? "ar" : "en"}" dir="${isArabic ? "rtl" : "ltr"}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Segoe UI,Tahoma,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
    <tr>
      <td align="center">
        <table width="600" style="background:#fff;border-radius:16px;overflow:hidden">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#C0A062,#D4B87A);padding:30px;text-align:center">
              <h1 style="margin:0;font-size:28px;color:#000">Sayarat</h1>
              <p style="margin:5px 0 0;color:#333;font-size:14px">Auto Style</p>
            </td>
          </tr>

          <!-- Alert -->
          <tr>
            <td style="padding:20px;text-align:center;background:${
              daysRemaining <= 3 ? "#FFF3E0" : "#E3F2FD"
            }">
              <div style="font-size:42px">
                ${daysRemaining <= 3 ? "⚠️" : "⏰"}
              </div>
              <h2 style="margin:10px 0;color:${
                daysRemaining <= 3 ? "#E65100" : "#1565C0"
              }">
                ${
                  daysRemaining === 1
                    ? isArabic
                      ? "ينتهي غداً!"
                      : "Expires Tomorrow!"
                    : isArabic
                    ? `${daysRemaining} أيام متبقية`
                    : `${daysRemaining} Days Remaining`
                }
              </h2>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:30px">
              <p style="font-size:16px">
                ${
                  isArabic
                    ? `مرحباً ${name || "عزيزي العميل"},`
                    : `Hi ${name || "Valued Customer"},`
                }
              </p>

              <p style="font-size:15px;color:#555">
                ${
                  isArabic
                    ? `اشتراكك ${tierName} سينتهي في <strong>${formattedDate}</strong>.`
                    : `Your ${tierName} subscription will expire on <strong>${formattedDate}</strong>.`
                }
              </p>

              <p style="font-size:15px;color:#555">
                ${
                  isArabic
                    ? "جدد الآن للحفاظ على جميع مميزات التاجر."
                    : "Renew now to maintain full access to dealer features."
                }
              </p>

              <div style="text-align:center;margin:30px 0">
                <a href="https://sayarat.com/subscription"
                  style="background:#C0A062;color:#000;padding:14px 32px;
                  text-decoration:none;border-radius:8px;font-weight:700">
                  ${isArabic ? "تجديد الاشتراك" : "Renew Subscription"}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#1a1a1a;padding:20px;text-align:center">
              <p style="font-size:12px;color:#aaa;margin:0">
                ${isArabic
                  ? "سيارات أوتو ستايل - سوق السيارات الأول في لبنان"
                  : "Sayarat Auto Style - Lebanon’s Premier Car Marketplace"}
              </p>
              <p style="font-size:11px;color:#777;margin-top:6px">
                support@sayarat.com
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
}
