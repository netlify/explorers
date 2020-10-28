import styles from './UserMaincontent.module.css';
import UserActivityGraph from './UserActivityGraph';
import UserMissionInfo from './UserMissionInfo';
import { useUserState } from 'src/context/user';

function UserMaincontent() {
  const { user } = useUserState();

  if (!user.activity) {
    return <p>loading...</p>;
  }

  return (
    <aside className={styles.main}>
      <div className={styles.section}>
        <div className={styles.profilecard}>
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

export default UserMaincontent;
