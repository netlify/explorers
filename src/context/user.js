import { redirectToOAuth, getTokenFromHash } from '../util/oauth';

const UserStateContext = React.createContext();

const cache = {};

export function UserProvider({ children }) {
  const [status, setStatus] = React.useState('loading');
  const [token, setToken] = React.useState();
  const [user, setUser] = React.useState();
  //TODO: placeholder while we build this
  const userdata = {
    accredidationProgress: 0.34,
    activeDates: {
      '2017-05-13': 2,
      '2017-05-14': 5,
      '2017-05-15': 4,
      '2017-05-16': 6,
      '2017-05-17': 1,
      '2017-05-18': 4,
    },
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

  React.useEffect(() => {
    const storedToken = window.localStorage.getItem('nf-session');
    const accessToken = storedToken
      ? JSON.parse(storedToken)?.access_token
      : false;

    setToken(accessToken || getTokenFromHash());
  }, []);

  React.useEffect(() => {
    if (!token) {
      return;
    }

    async function getUser() {
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

  const state = {
    user,
    token,
    status,
    redirectToOAuth,
    userdata,
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
