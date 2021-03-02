import { useAchievementState } from '@context/achievement';
import { useRouter } from 'next/router';
export default function AchievementNudge() {
  const { achievements, getAchievement } = useAchievementState();

  const router = useRouter();

  router.events.on('routeChangeStart', async (url) => {
    // console.log('route changed to ' + url);
    await getAchievement();
  });

  // useEffect(() => {
  //   if (user && user.id) {
  //     async function fetchData() {
  //       const result = await fetch('.netlify/functions/get-user-achievement', {
  //         method: 'POST',
  //         body: JSON.stringify({ user_id: user.id }),
  //       }).then((res) => res.json());
  //       setUserAchievements(result.achievements);
  //     }
  //     fetchData();
  //   }
  // }, []);

  const unclaimedAchievement =
    (achievements &&
      achievements
        .filter((achievement) => achievement.claimed == false)
        .map(({ claimed }) => ({
          claimed,
        }))) ||
    [];

  if (!unclaimedAchievement.length > 0) return null;
  return (
    <>
      <div>🔔</div>
    </>
  );
}
