import { redirectToOAuth, getTokenFromHash } from '../util/oauth';

const UserStateContext = React.createContext();

const cache = {};

export function UserProvider({ children }) {
  const [status, setStatus] = React.useState('loading');
  const [token, setToken] = React.useState();
  const [user, setUser] = React.useState();

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
