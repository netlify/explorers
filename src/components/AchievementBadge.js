import { useAchievementState } from '@context/achievement';
import Rosette from '@components/Rosette';
import styles from './AchievementBadge.module.css';
export default function AchievementNudge() {
  const { achievements, getAchievement } = useAchievementState();

  const unclaimedAchievement =
    (achievements &&
      achievements.filter(
        (achievement) => achievement?.rewards?.[0]?.is_claimed === false
      )) ||
    [];

  if (!unclaimedAchievement.length > 0) return null;
  return (
    <div className={styles.badge}>
      <Rosette width="20" height="20" />
    </div>
  );
}
