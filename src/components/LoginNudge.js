import { useUserState } from '@context/user';
import styles from './LoginNudge.module.css';

export default function LoginNudge() {
  const { user, redirectToOAuth } = useUserState();

  if (user) {
    return null;
  }

  return (
    <div className={styles.banner}>
      <a
        href="#login"
        onClick={() => redirectToOAuth()}
        className={styles.link}
      >
        Log in
      </a>{' '}
      to track your progress, ya jabroni
    </div>
  );
}
