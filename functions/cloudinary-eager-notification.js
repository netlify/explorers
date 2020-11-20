const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { eager = [] } = JSON.parse(event.body);
  const count = eager.length || 0;

  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `Cloudinary finished encoding ${count} video assets`,
    }),
  });

  return {
    statusCode: 200,
    body: 'Cloudinary eager_notification_url',
  };
};
