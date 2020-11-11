import { useUserState } from '@context/user';
import styles from './LoginNudge.module.css';

export default function LoginNudge() {
  const { user, redirectToOAuth } = useUserState();

  if (user) {
    return null;
  }

  return (
    <aside className={styles.banner}>
      <a
        href="#login"
        onClick={() => redirectToOAuth()}
        className={styles.link}
      >
        Log in
      </a>{' '}
      to track progress through the mission. Once you've completed 3 missions,
      you'll receive a <strong>Certificate of Completion</strong> for your
      astounding efforts.
    </aside>
  );
}
