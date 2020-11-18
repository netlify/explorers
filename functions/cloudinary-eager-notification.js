const fetch = require('node-fetch');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  await fetch(
    'https://hooks.slack.com/services/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',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `Cloudinary finished encoding ${
          body.eager.length ?? 0
        } video assets`,
      }),
    }
  );

  return {
    statusCode: 200,
    body: 'Cloudinary eager_notification_url',
  };
};
