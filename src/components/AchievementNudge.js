import { useUserState } from '@context/user';
import { useEffect, useState } from 'react';
import fetch from 'node-fetch';
import styles from './AchievementNudge.module.css';

export default function AchievementNudge() {
  const { user } = useUserState();
  if (!user) {
    return null;
  }
  const [achievement, setAchievement] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await fetch('.netlify/functions/get-user-achievement', {
        method: 'POST',
        body: JSON.stringify({ user_id: user.id }),
      }).then((res) => res.json());
      setAchievement(result.achievements);
    }
    fetchData();
  }, []);

  if (!achievement.length > 0) return null;
  return (
    <aside className={styles.banner}>
      Congratulations 🎉🥳 <br></br> You have unlocked an achievement!
      <br />
      <a href="#login" className={styles.link}>
        Claim it now!
      </a>{' '}
    </aside>
  );
}
