import styles from './Navigation.module.css';
import Link from 'next/link';
import { useUserState } from 'src/context/user';

function Navigation({ theme }) {
  const { status, user } = useUserState();

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="110"
                height="30"
                viewBox="0 0 147 40"
              >
                <defs>
                  <radialGradient
                    id="a"
                    cy="0%"
                    r="100.11%"
                    fx="50%"
                    fy="0%"
                    gradientTransform="matrix(0 .9989 -1.152 0 .5 -.5)"
                  >
                    <stop offset="0%" stopColor="#20C6B7" />
                    <stop offset="100%" stopColor="#4D9ABF" />
                  </radialGradient>
                </defs>
                <g fillRule="evenodd">
                  <path
                    fill={theme === 'dark' ? '#FFF' : '#000'}
                    d="M53.37 12.978l.123 2.198c1.403-1.7 3.245-2.55 5.525-2.55 3.951 0 5.962 2.268 6.032 6.804v12.568H60.79V19.676c0-1.207-.26-2.1-.78-2.681-.52-.58-1.371-.87-2.552-.87-1.719 0-3 .78-3.84 2.338v13.535h-4.262v-19.02h4.016zM77.748 32.35c-2.7 0-4.89-.852-6.567-2.557-1.678-1.705-2.517-3.976-2.517-6.812v-.527c0-1.898.365-3.595 1.096-5.089.73-1.494 1.757-2.657 3.078-3.49 1.321-.831 2.794-1.247 4.42-1.247 2.583 0 4.58.826 5.988 2.478 1.41 1.653 2.114 3.99 2.114 7.014v1.723h-12.4c.13 1.57.652 2.812 1.57 3.726.918.914 2.073 1.371 3.464 1.371 1.952 0 3.542-.79 4.77-2.373l2.297 2.198c-.76 1.136-1.774 2.018-3.042 2.645-1.269.627-2.692.94-4.27.94zm-.508-16.294c-1.17 0-2.113.41-2.832 1.23-.72.82-1.178 1.963-1.377 3.428h8.12v-.317c-.094-1.43-.474-2.51-1.14-3.243-.667-.732-1.59-1.098-2.771-1.098zm16.765-7.7v4.623h3.35v3.164h-3.35V26.76c0 .726.144 1.25.43 1.573.286.322.798.483 1.535.483a6.55 6.55 0 0 0 1.49-.176v3.305c-.97.27-1.905.404-2.806.404-3.273 0-4.91-1.81-4.91-5.431V16.142H86.62v-3.164h3.122V8.355h4.261zm11.137 23.643h-4.262v-27h4.262v27zm9.172 0h-4.262v-19.02h4.262v19.02zm-4.525-23.96c0-.655.207-1.2.622-1.634.416-.433 1.009-.65 1.78-.65.772 0 1.368.217 1.79.65.42.434.63.979.63 1.635 0 .644-.21 1.18-.63 1.608-.422.428-1.018.642-1.79.642-.771 0-1.364-.214-1.78-.642-.415-.427-.622-.964-.622-1.608zm10.663 23.96V16.142h-2.894v-3.164h2.894v-1.74c0-2.11.584-3.738 1.753-4.887 1.17-1.148 2.806-1.722 4.91-1.722.749 0 1.544.105 2.386.316l-.105 3.34a8.375 8.375 0 0 0-1.631-.14c-2.035 0-3.052 1.048-3.052 3.146v1.687h3.858v3.164h-3.858v15.856h-4.261zm17.87-6.117l3.858-12.903h4.542l-7.54 21.903c-1.158 3.199-3.122 4.799-5.893 4.799-.62 0-1.304-.106-2.052-.317v-3.305l.807.053c1.075 0 1.885-.196 2.429-.589.543-.392.973-1.051 1.289-1.977l.613-1.635-6.664-18.932h4.595l4.016 12.903z"
                  />
                  <path
                    fill="url(#a)"
                    fillRule="nonzero"
                    d="M28.589 14.135l-.014-.006c-.008-.003-.016-.006-.023-.013a.11.11 0 0 1-.028-.093l.773-4.726 3.625 3.626-3.77 1.604a.083.083 0 0 1-.033.006h-.015c-.005-.003-.01-.007-.02-.017a1.716 1.716 0 0 0-.495-.381zm5.258-.288l3.876 3.876c.805.806 1.208 1.208 1.355 1.674.022.069.04.138.054.209l-9.263-3.923a.728.728 0 0 0-.015-.006c-.037-.015-.08-.032-.08-.07 0-.038.044-.056.081-.071l.012-.005 3.98-1.684zm5.127 7.003c-.2.376-.59.766-1.25 1.427l-4.37 4.369-5.652-1.177-.03-.006c-.05-.008-.103-.017-.103-.062a1.706 1.706 0 0 0-.655-1.193c-.023-.023-.017-.059-.01-.092 0-.005 0-.01.002-.014l1.063-6.526.004-.022c.006-.05.015-.108.06-.108a1.73 1.73 0 0 0 1.16-.665c.009-.01.015-.021.027-.027.032-.015.07 0 .103.014l9.65 4.082zm-6.625 6.801l-7.186 7.186 1.23-7.56.002-.01c.001-.01.003-.02.006-.029.01-.024.036-.034.061-.044l.012-.005a1.85 1.85 0 0 0 .695-.517c.024-.028.053-.055.09-.06a.09.09 0 0 1 .029 0l5.06 1.04zm-8.707 8.707l-.81.81-8.955-12.942a.424.424 0 0 0-.01-.014c-.014-.019-.029-.038-.026-.06 0-.016.011-.03.022-.042l.01-.013c.027-.04.05-.08.075-.123l.02-.035.003-.003c.014-.024.027-.047.051-.06.021-.01.05-.006.073-.001l9.921 2.046a.164.164 0 0 1 .076.033c.013.013.016.027.019.043a1.757 1.757 0 0 0 1.028 1.175c.028.014.016.045.003.078a.238.238 0 0 0-.015.045c-.125.76-1.197 7.298-1.485 9.063zm-1.692 1.691c-.597.591-.949.904-1.347 1.03a2 2 0 0 1-1.206 0c-.466-.148-.869-.55-1.674-1.356L8.73 28.73l2.349-3.643c.011-.018.022-.034.04-.047.025-.018.061-.01.091 0a2.434 2.434 0 0 0 1.638-.083c.027-.01.054-.017.075.002a.19.19 0 0 1 .028.032L21.95 38.05zM7.863 27.863L5.8 25.8l4.074-1.738a.084.084 0 0 1 .033-.007c.034 0 .054.034.072.065a2.91 2.91 0 0 0 .13.184l.013.016c.012.017.004.034-.008.05l-2.25 3.493zm-2.976-2.976l-2.61-2.61c-.444-.444-.766-.766-.99-1.043l7.936 1.646a.84.84 0 0 0 .03.005c.049.008.103.017.103.063 0 .05-.059.073-.109.092l-.023.01-4.337 1.837zM.831 19.892a2 2 0 0 1 .09-.495c.148-.466.55-.868 1.356-1.674l3.34-3.34a2175.525 2175.525 0 0 0 4.626 6.687c.027.036.057.076.026.106-.146.161-.292.337-.395.528a.16.16 0 0 1-.05.062c-.013.008-.027.005-.042.002H9.78L.831 19.891zm5.68-6.403L11 8.998c.423.185 1.96.834 3.333 1.414 1.04.44 1.988.84 2.286.97.03.012.057.024.07.054.008.018.004.041 0 .06a2.003 2.003 0 0 0 .523 1.828c.03.03 0 .073-.026.11l-.014.021-4.56 7.063c-.012.02-.023.037-.043.05-.024.015-.058.008-.086.001a2.274 2.274 0 0 0-.543-.074c-.164 0-.342.03-.522.063h-.001c-.02.003-.038.007-.054-.005a.21.21 0 0 1-.045-.051l-4.808-7.013zm5.398-5.398l5.814-5.814c.805-.805 1.208-1.208 1.674-1.355a2 2 0 0 1 1.206 0c.466.147.869.55 1.674 1.355l1.26 1.26-4.135 6.404a.155.155 0 0 1-.041.048c-.025.017-.06.01-.09 0a2.097 2.097 0 0 0-1.92.37c-.027.028-.067.012-.101-.003-.54-.235-4.74-2.01-5.341-2.265zm12.506-3.676l3.818 3.818-.92 5.698v.015a.135.135 0 0 1-.008.038c-.01.02-.03.024-.05.03a1.83 1.83 0 0 0-.548.273.154.154 0 0 0-.02.017c-.011.012-.022.023-.04.025a.114.114 0 0 1-.043-.007l-5.818-2.472-.011-.005c-.037-.015-.081-.033-.081-.071a2.198 2.198 0 0 0-.31-.915c-.028-.046-.059-.094-.035-.141l4.066-6.303zm-3.932 8.606l5.454 2.31c.03.014.063.027.076.058a.106.106 0 0 1 0 .057c-.016.08-.03.171-.03.263v.153c0 .038-.039.054-.075.069l-.011.004c-.864.369-12.13 5.173-12.147 5.173-.017 0-.035 0-.052-.017-.03-.03 0-.072.027-.11a.76.76 0 0 0 .014-.02l4.482-6.94.008-.012c.026-.042.056-.089.104-.089l.045.007c.102.014.192.027.283.027.68 0 1.31-.331 1.69-.897a.16.16 0 0 1 .034-.04c.027-.02.067-.01.098.004zm-6.246 9.185l12.28-5.237s.018 0 .035.017c.067.067.124.112.179.154l.027.017c.025.014.05.03.052.056 0 .01 0 .016-.002.025L25.756 23.7l-.004.026c-.007.05-.014.107-.061.107a1.729 1.729 0 0 0-1.373.847l-.005.008c-.014.023-.027.045-.05.057-.021.01-.048.006-.07.001l-9.793-2.02c-.01-.002-.152-.519-.163-.52z"
                    transform="translate(-.702)"
                  />
                </g>
              </svg>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/missions" as="/missions">
            <a>Missions</a>
          </Link>
        </li>
        <li>
          <Link href="">
            <a>Progress</a>
          </Link>
        </li>
      </ul>
      {status === 'loaded' && (
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
      )}
    </nav>
  );
}

export default Navigation;
