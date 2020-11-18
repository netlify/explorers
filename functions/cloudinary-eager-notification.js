const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { eager = [] } = JSON.parse(event.body);
  const count = eager.length || 0;

  await fetch(
    'https://hooks.slack.com/services/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',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `Cloudinary finished encoding ${count} video assets`,
      }),
    }
  );

  return {
    statusCode: 200,
    body: 'Cloudinary eager_notification_url',
  };
};
