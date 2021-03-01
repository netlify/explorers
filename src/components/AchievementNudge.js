import { useEffect, useState } from 'react';
// import { useAchievementState } from '@context/achievement';
import { useUserState } from '@context/user';

export default function AchievementNudge() {
  // const achievementState = useAchievementState();
  const [userAchievements, setUserAchievements] = useState([]);
  const { user } = useUserState();

  /*
    TODO
    Get achievement from context, instead of calling endpoint again!
  */

  //const achievements = achievementState

  useEffect(() => {
    if (user && user.id) {
      console.log('userId', user.id);
      async function fetchData() {
        const result = await fetch('.netlify/functions/get-user-achievement', {
          method: 'POST',
          body: JSON.stringify({ user_id: user.id }),
        }).then((res) => res.json());
        setUserAchievements(result.achievements);
      }
      fetchData();
      // console.log(userAchievements);
    }
  }, []);

  const unclaimedAchievement = userAchievements
    .filter((achievement) => achievement.claimed == false)
    .map(({ event_data, type, claimed }) => ({
      event_data,
      type,
      claimed,
    }));
  console.log('unclaimed:', unclaimedAchievement);
  if (!unclaimedAchievement.length > 0) return null;
  return (
    <>
      <div>🔔</div>
    </>
  );
}
