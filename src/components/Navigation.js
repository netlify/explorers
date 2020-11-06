import styles from './Navigation.module.css';
import Link from 'next/link';
import NetlifyLogo from './NetlifyLogo';
import { useUserState } from 'src/context/user';

function Navigation({ theme }) {
  const { token, user, status, redirectToOAuth } = useUserState();

  return (
    <nav
      className={`${styles.nav} ${
        theme === 'dark' ? styles.navdark : styles.navlight
      }`}
    >
      <ul>
        <li>
          <Link href="/" as="/">
            <a>
              <NetlifyLogo theme={theme} />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/missions" as="/missions">
            <a>Missions</a>
          </Link>
        </li>
        <li>
          <Link href="/about" as="/about">
            <a>About</a>
          </Link>
        </li>
      </ul>
      {status === 'loaded' ? (
        <>
          <Link href="/profile">
            <a className={styles.profile}>
              <span className={styles.username}>{user.full_name}</span>
              <img
                className={styles.avatar}
                src={user.avatar_url}
                alt={`${user.full_name}’s avatar`}
              />
            </a>
          </Link>
        </>
      ) : (
        <button onClick={() => redirectToOAuth()} className="btn btn-primary">
          Log In with Netlify
        </button>
      )}
    </nav>
  );
}

export default Navigation;
