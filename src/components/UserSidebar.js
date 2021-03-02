import styles from './UserSidebar.module.css';
import UserProfilesvg from './UserProfilesvg';
import UserRadar from './UserRadar';
import UserDial from './UserDial';
import { useUserState } from 'src/context/user';
import { map } from 'lodash';

function UserSidebar(props) {
  const { user } = useUserState();
  let achievements = null;

  // console.log('sidebar');
  // console.log(props);

  if (props?.achievement) {
    achievements = props.achievement;
  }

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
        <br></br> <br />
        {achievements ? (
          <section className={styles['section-item']}>
            <h4 className={styles.accreditation}>Achievements</h4>

            {achievements.map((achievement, index) => (
              <div key={index} className={styles.achievement}>
                <p>🎉 {achievement.type} 🎉</p>
                {achievement.claimed === false ? (
                  <button>Claim it</button>
                ) : null}
              </div>
            ))}
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default UserSidebar;
