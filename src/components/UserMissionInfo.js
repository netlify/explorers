import styles from './UserCourseInfo.module.css';
import Link from 'next/link';
import Tracker from './Tracker';

function UserMissionInfo({ mission }) {
  return (
    <Link href="/learn/[slug]" as={`/learn/${mission.missionSlug}`}>
      <a className={styles.coursecontainer}>
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
      </a>
    </Link>
  );
}

export default UserMissionInfo;
