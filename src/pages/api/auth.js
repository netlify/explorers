import { oauth } from '../../util/oauth';

export default function handler(req, res) {
  const { url, csrf } = req.query;

  if (!url || !csrf) {
    res
      .status(401)
      .json({ error: 'Missing required parameters `url` and `csrf`' });
  }

  const authorizationURI = oauth.authorizeURL({
    redirect_uri: process.env.NETLIFY_OAUTH_REDIRECT_URI,
    state: `url=${url}&csrf=${csrfToken}`,

    // for now, this is always blank. in the future, specific scopes will be
    // required to perform actions on the user’s behalf
    scope: '',
  });

  res.statusCode = 301;
  res.setHeader('Location', authorizationURI);
  res.setHeader('Cache-Control', 'no-cache');
  res.send('redirecting to authorization...');
}
