import Link from 'next/link';
import { useState } from 'react';

import styles from './Navigation.module.css';

import NetlifyLogo from './NetlifyLogo';
import Hamburger from './Hamburger';

import { useUserState } from 'src/context/user';
import { useMediaQuery } from '@hooks/useMediaQuery';

function Navigation({ theme }) {
  let isMobile = useMediaQuery('(max-width: 1100px)');

  let [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);

  const navClassName = () => {
    if (theme) {
      return styles[`nav${theme}`];
    } else {
      return styles.navlight;
    }
  };

  return (
    <nav className={`${styles.nav} ${navClassName()}`}>
      <ul>
        <li>
          <Link href="/" as="/">
            <a>
              <NetlifyLogo theme={theme} />
            </a>
          </Link>
        </li>
        {!isMobile && (
          <>
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
          </>
        )}
      </ul>
      {!isMobile && <ul>{renderUser()}</ul>}
      {isMobile && (
        <>
          <Hamburger
            isActive={mobileMenuExpanded}
            onClick={() => {
              setMobileMenuExpanded(!mobileMenuExpanded);
            }}
            theme={theme}
          />
          {mobileMenuExpanded && (
            <div className={styles.drawer}>
              <ul>
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
                {renderUser()}
              </ul>
            </div>
          )}
        </>
      )}
    </nav>
  );
}

function renderUser() {
  const { user, redirectToOAuth, logoutUser } = useUserState();

  if (user && user.full_name) {
    return (
      <>
        <li>
          <Link href="/">
            <a className={styles.profile} onClick={logoutUser}>
              Logout
            </a>
          </Link>
        </li>
        <li>
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
        </li>
      </>
    );
  } else {
    return (
      <div>
        <button onClick={() => redirectToOAuth()} className="btn btnprimary">
          Log In with Netlify
        </button>
      </div>
    );
  }
}

export default Navigation;
