import { useUserState } from '@context/user';
const AchievementStateContext = React.createContext();

export function AchievementProvider({ children }) {
  const [status, setStatus] = React.useState('loading');
  const [achievements, setAchievements] = React.useState();
  const { user } = useUserState();

  const getAchievement = async () => {
    const achievements = await fetch(
      '/.netlify/functions/get-user-achievement',
      {
        method: 'POST',
        body: JSON.stringify({ user_id: user.id }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.achievements.filter((a) => {
          return a.rewards.length > 0;
        });

        return filtered;
      });

    setAchievements(achievements);
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
