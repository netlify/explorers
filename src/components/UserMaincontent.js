import styles from './UserMaincontent.module.css';
import UserActivityGraph from './UserActivityGraph';
import UserMissionInfo from './UserMissionInfo';
import Sun from './Sun';
import { useUserState } from 'src/context/user';
import Link from 'next/link';

function UserMaincontent() {
  const { user } = useUserState();
  const hasUserActivity = user.activity.userMissions.length;

  if (!user.activity) {
    return <p>loading...</p>;
  }

  if (!hasUserActivity) {
    return (
      <aside className={styles.main}>
        <div className={styles.section}>
          <div className={styles.profilecard}>
            <div
              style={{
                textAlign: 'center',
                fontSize: '120%',
                padding: '40px 0',
              }}
            >
              <p>The sun is 27 million degrees.</p>
              <Sun />
              <p>If you watch 3 of our missions, you get a degree too!</p>
              <Link href="/missions" as="/missions">
                <a className="btn btnprimary">Get started!</a>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    );
  } else {
    return (
      <aside className={styles.main}>
        <div className={styles.section}>
          <div className={styles.profilecard} id="user-activity-card">
            <h4 className={styles.profileh4}>Your Activity</h4>
            <UserActivityGraph />
          </div>

          <div className={styles.profilecard}>
            <h4 className={styles.profileh4}>Your Courses</h4>
            {user.activity.userMissions.map((mission, index) => (
              <UserMissionInfo key={index} mission={mission} />
            ))}
          </div>
        </div>
      </aside>
    );
  }
}

export default UserMaincontent;
