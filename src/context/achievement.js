import { useUserState } from '@context/user';
const AchievementStateContext = React.createContext();

export function AchievementProvider({ children }) {
  const [status, setStatus] = React.useState('loading');
  const [achievements, setAchievements] = React.useState();
  const { user } = useUserState();

  const getAchievement = async () => {
    const result = await fetch('/.netlify/functions/get-user-achievement', {
      method: 'POST',
      body: JSON.stringify({ user_id: user.id }),
    }).then((res) => res.json());
    setAchievements(result.achievements);
    setStatus('loaded');
  };

  React.useEffect(() => {
    if (user?.id) {
      getAchievement();
    }
  }, [user]);

  const state = {
    achievements,
    status,
    getAchievement,
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
