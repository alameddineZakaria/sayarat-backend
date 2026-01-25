// utils/sendEmail.js
async function sendEmail(to, name, subject, body) {
  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to, name }] }],
      from: { email: process.env.EMAIL_FROM, name: 'AutoMarket' },
      subject,
      content: [{
        type: 'text/html',
        value: `<p>${body}</p>`
      }]
    }),
  });

  return res.ok;
}

module.exports = sendEmail;
