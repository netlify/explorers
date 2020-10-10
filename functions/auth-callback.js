const qs = require('querystring');
const oauth = require('./util/oauth');

exports.handler = async (event) => {
  if (!event.queryStringParameters) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Not authorized' }),
    };
  }

  const { code, state } = event.queryStringParameters;
  const { url, csrf } = qs.parse(state);

  try {
    // if the user accepts, we get an authorization token, which we need to
    // exchange for an access token
    const { token } = await oauth.getToken({
      code,
      redirect_uri: process.env.NETLIFY_OAUTH_REDIRECT_URI,
    });

    return {
      statusCode: 302,
      headers: {
        Location: `${url}#csrf=${csrf}&token=${token.access_token}`,
        'Cache-Control': 'no-cache',
      },
      body: 'redirecting to application...',
    };
  } catch (err) {
    console.error('Access token error', err.message);
    console.error(err);

    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
