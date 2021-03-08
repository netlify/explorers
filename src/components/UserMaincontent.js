import styles from './UserMaincontent.module.css';
import UserActivityGraph from './UserActivityGraph';
import UserMissionInfo from './UserMissionInfo';
import UserAchievementInfo from './UserAchievementInfo';
import Sun from './Sun';
import { useUserState } from 'src/context/user';
import Link from 'next/link';

function UserMaincontent(props) {
  const { user } = useUserState();
  const hasUserActivity = user.activity.userMissions.length;

  console.log(props);
  let achievements = null;
  if (props?.achievement) {
    achievements = props.achievement;
    console.log('achivement exists');
    console.log(achievements);
  }

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

          {achievements ? (
            <div className={styles.profilecard}>
              <h4 className={styles.profileh4}>Achievements and Rewards</h4>
              {achievements.map((achievement, index) => (
                <UserAchievementInfo key={index} achievements={achievement} />
              ))}
            </div>
          ) : null}
        </div>
      </aside>
    );
  }
}

export default UserMaincontent;
