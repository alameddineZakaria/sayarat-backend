module.exports = async function sendPushNotification(token, title, body, data) {
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: token,
      title,
      body,
      data,
      sound: 'default',
      priority: data?.is_urgent ? 'high' : 'default',
    }),
  });
};
