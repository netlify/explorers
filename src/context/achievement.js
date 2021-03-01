import netlifyActivity from '@netlify/activity-hub';
import { useUserState } from '@context/user';
const AchievementStateContext = React.createContext();

import { useRouter } from 'next/router';

export function AchievementProvider({ children }) {
  const [status, setStatus] = React.useState('loading');
  const [achievements, setAchievements] = React.useState();
  const { user } = useUserState();
  const router = useRouter();

  const getAchievement = async (current) => {
    console.log('ahcievements pre-run', achievements);

    console.log('getAchievement runs');

    const result = await fetch('.netlify/functions/get-user-achievement', {
      method: 'POST',
      body: JSON.stringify({ user_id: user.id }),
    }).then((res) => res.json());

    if (current) {
      setAchievements(result.achievements);
      setStatus('loaded');
      console.log('ahcievements post-run', achievements);
    }
    return result;
  };

  React.useEffect(() => {
    let current = true;
    // https://nextjs.org/docs/api-reference/next/router
    if (user?.id && current) {
      getAchievement(current);
    }

    return () => {
      current = false;
    };
  }, [router.pathname]);

  const state = {
    achievements,
    status,
  };

  return (
    <AchievementStateContext.Provider value={state}>
      {children}
    </AchievementStateContext.Provider>
  );
}

export function useAchievementState() {
  const state = React.useContext(AchievementStateContext);

  if (state === undefined) {
    throw new Error(
      'useAchievementState must be used within an Achievement Provider'
    );
  }
  return state;
}
