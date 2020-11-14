import netlifyActivity from '@netlify/activity-hub';

const UserStateContext = React.createContext();

const cache = {};

import { v4 as uuid } from 'uuid';

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
  window.location.href = `https://jamstack-explorers.netlify.app/.netlify/functions/auth?url=${successURL}&csrf=${csrfToken}`;
}

export function getTokenFromHash() {
  // if there’s no hash, do nothing
  if (!window.location.hash) {
    return false;
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

export function UserProvider({ children }) {
  const [status, setStatus] = React.useState('loading');
  const [token, setToken] = React.useState();
  const [user, setUser] = React.useState();
  const [activity, setActivity] = React.useState();

  //TODO: placeholder while we build this
  const userdata = {
    accredidationProgress: 0.34,
    // TODO we don’t have categories right now, so we can’t determine this data
    skills: [
      {
        data: {
          jamstack: 0.4,
          react: 0.65,
          vue: 0.9,
          angular: 0.67,
          netlify: 0.8,
        },
        meta: { color: 'rgba(255, 68, 149, 0.7)' },
      },
      {
        data: {
          jamstack: 1,
          react: 0.9,
          vue: 0.5,
          angular: 0.6,
          netlify: 0.7,
        },
        meta: { color: 'rgba(170, 77, 232, 0.7)' },
      },
    ],
    userCourses: [
      {
        title: 'Vue and Nuxt',
        instructor: 'Sarah Drasner',
        coverImage:
          'https://cdn.sanity.io/images/q8efilev/production/e4313495f322e448fec7f41b833b0dabb3799178-800x714.jpg',
        progress: 0.6,
      },
      {
        title: 'Next and React',
        instructor: 'Cassidy Williams',
        coverImage:
          'https://cdn.sanity.io/images/q8efilev/production/e4313495f322e448fec7f41b833b0dabb3799178-800x714.jpg',
        progress: 0.3,
      },
    ],
  };

  const logoutUser = () => {
    console.log('User logged out');
    setActivity(undefined);
    window.localStorage.removeItem('nf-session');
    window.location.reload();
  };

  React.useEffect(() => {
    const storedToken = window.localStorage.getItem('nf-session');
    const accessToken = storedToken
      ? JSON.parse(storedToken)?.access_token
      : false;

    setToken(getTokenFromHash() || accessToken);
  }, []);

  React.useEffect(() => {
    if (!token) {
      return;
    }

    async function getUser() {
      // TODO add SWR
      const result = await fetch('/api/get-user-info', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => response.json());

      const userWithAvatarFallback = {
        ...result,
        avatar_url: result.avatar_url ?? 'https://via.placeholder.com/150',
      };

      setUser(userWithAvatarFallback);
      setStatus('loaded');
      cache[token] = userWithAvatarFallback;
    }

    // use cached user data if we’ve already hit the API with this token
    if (cache[token]) {
      setUser(cache[token]);
      setStatus('loaded');
      return;
    }

    getUser();
  }, [token]);

  React.useEffect(() => {
    if (!user?.id) {
      return;
    }

    async function createActivityObject() {
      const send = netlifyActivity({
        userId: user.id,
        app: 'jamstack-explorers',
      });

      setActivity({ send });
    }

    createActivityObject();
  }, [user]);

  const state = {
    user,
    token,
    status,
    redirectToOAuth,
    userdata,
    activity,
    logoutUser,
  };

  return (
    <UserStateContext.Provider value={state}>
      {children}
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  const state = React.useContext(UserStateContext);

  if (state === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }

  return state;
}
