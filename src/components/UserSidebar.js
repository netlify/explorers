import styles from './UserSidebar.module.css';
import UserProfilesvg from './UserProfilesvg';
import UserRadar from './UserRadar';
import UserDial from './UserDial';
import { useUserState } from 'src/context/user';
import { map } from 'lodash';

function UserSidebar() {
  const { user } = useUserState();

  // console.log('sidebar');
  // console.log(props);
  // const achievements = props.achievement.map((ach) => ach.type);

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
        <br></br>
        <section className={styles['section-item']}>
          <h4 className={styles.accreditation}>Achievements</h4>
          <div></div>
        </section>
      </div>
    </div>
  );
}

export default UserSidebar;
