import { v4 as uuid } from 'uuid';

// function createAuthClient(credentials) {
//   if (!credentials.client.id || !credentials.client.secret) {
//     throw new Error(
//       'Missing a valid Netlify OAuth client ID and secret. Get these at https://app.netlify.com/user/applications'
//     );
//   }

//   return new AuthorizationCode(credentials);
// }

// export const oauth = createAuthClient({
//   client: {
//     // generate a client ID & secret at https://app.netlify.com/user/applications
//     id: process.env.NETLIFY_OAUTH_CLIENT_ID,
//     secret: process.env.NETLIFY_OAUTH_CLIENT_SECRET,
//   },
//   auth: {
//     tokenHost: 'https://api.netlify.com',
//     tokenPath: 'https://api.netlify.com/oauth/token',
//     authorizePath: 'https://app.netlify.com/authorize',
//   },
// });

export function redirectToOAuth(returnURL) {
  const { location, localStorage } = window;

  // prevent shenanigans using a CSRF token
  // see https://owasp.org/www-community/attacks/csrf
  const csrfToken = uuid();

  // store the token so we can use it later for validation
  localStorage.setItem(csrfToken, 'true');

  // tell the auth flow where to go once you have a token
  const successURL = returnURL || `${location.origin}${location.pathname}`;

  // redirect to start the OAuth flow
  window.location.href = `/api/auth?url=${successURL}&csrf=${csrfToken}`;
}

export function getTokenFromHash() {
  // if there’s no hash, do nothing
  if (!window.location.hash) {
    return;
  }

  // if there’s a hash, remove the # and parse the rest as a query string
  const querystring = window.location.hash.replace(/^#/, '');
  const { token, csrf } = Object.fromEntries(
    new URLSearchParams(querystring).entries()
  );

  // make sure the CSRF token matches the one stored in the user’s browser
  if (token && !localStorage.getItem(csrf)) {
    throw new Error('Invalid token. Please retry logging in.');
  }

  // after confirming the CSRF is valid we can clean up after ourselves
  localStorage.removeItem(csrf);

  localStorage.setItem(
    'nf-session',
    JSON.stringify({
      access_token: token,
    })
  );

  // remove the hash from the URL so no one accidentally copy-pastes it
  window.history.pushState(
    '',
    document.title,
    window.location.pathname + window.location.search
  );

  return token;
}
