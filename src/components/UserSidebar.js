import styles from './UserSidebar.module.css';
import UserProfilesvg from './UserProfilesvg';
import UserRadar from './UserRadar';
import UserDial from './UserDial';
import { useUserState } from 'src/context/user';

function UserSidebar() {
  const { user } = useUserState();

  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>
        <section className={styles['section-item']}>
          <UserProfilesvg className={styles.usersvg} />
          <h3 className={styles.username}>{user.full_name}</h3>
          <h4 className={styles.usertitle}>Captain</h4>
        </section>

        <hr className={styles.hr} />
        {/*
          // TODO: when we have categories + more data, we want this back!
          <UserRadar />
        */}

        <section className={styles['section-item']}>
          <h4 className={styles.accreditation}>Certificate Progress</h4>
          <UserDial />
        </section>
      </div>
    </div>
  );
}

export default UserSidebar;
