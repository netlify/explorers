const { AuthorizationCode } = require('simple-oauth2');

function createAuthClient(credentials) {
  if (!credentials.client.id || !credentials.client.secret) {
    throw new Error(
      'Missing a valid Netlify OAuth client ID and secret. Get these at https://app.netlify.com/user/applications'
    );
  }

  return new AuthorizationCode(credentials);
}

module.exports = createAuthClient({
  client: {
    // generate a client ID & secret at https://app.netlify.com/user/applications
    id: process.env.NETLIFY_OAUTH_CLIENT_ID,
    secret: process.env.NETLIFY_OAUTH_CLIENT_SECRET,
  },
  auth: {
    tokenHost: 'https://api.netlify.com',
    tokenPath: 'https://api.netlify.com/oauth/token',
    authorizePath: 'https://app.netlify.com/authorize',
  },
});
