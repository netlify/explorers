// import styles from './UserCourseInfo.module.css';
import styles from './UserAchievement.module.css';
import Rosette from '@components/Rosette';
import Link from 'next/link';

function UserAchievementInfo({ achievements }) {
  return (
    <div className={styles.coursecontainer}>
      <div className={styles.coverimage}>
        <Rosette width="35" height="35" />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <p className={styles.courseLink}>{achievements.type}</p>
        </div>
        <div className={styles.description}>
          <p>{achievements.description}</p>
        </div>
        <div>
          {achievements.claimed === false ? (
            <button className={styles.btnclaim}>Claim Reward</button>
          ) : achievements.claimed === true ? (
            <button className={styles.btnclaimed}>Claimed </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default UserAchievementInfo;
