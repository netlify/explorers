import styles from './UserCourseInfo.module.css';
import Tracker from './Tracker';

function UserMissionInfo({ mission }) {
  return (
    <div className={styles.coursecontainer}>
      <div className={styles.coverimage}>
        <img src={mission.coverImage} width="50" height="50" />
      </div>
      <div className={styles.title}>
        <p>{mission.title}</p>
      </div>
      <div className={styles.instructor}>
        <p>{mission.instructor}</p>
      </div>
      <div className={styles.tracker}>
        <Tracker progress={mission.progress} />
      </div>
    </div>
  );
}

export default UserMissionInfo;
