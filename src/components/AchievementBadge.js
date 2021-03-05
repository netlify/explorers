import { useAchievementState } from '@context/achievement';
import { useRouter } from 'next/router';
import Rosette from '@components/Rosette';
import styles from './AchievementBadge.module.css';
export default function AchievementNudge() {
  const { achievements, getAchievement } = useAchievementState();

  const router = useRouter();

  router.events.on('routeChangeStart', async (url) => {
    // console.log('route changed to ' + url);
    await getAchievement();
  });

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
    <div className={styles.badge}>
      <Rosette width="20" height="20" />
    </div>
  );
}
