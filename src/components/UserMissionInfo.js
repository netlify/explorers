import styles from './UserCourseInfo.module.css';
import Link from 'next/link';
import Tracker from './Tracker';

function UserMissionInfo({ mission }) {
  return (
    <div className={styles.coursecontainer}>
      <div className={styles.coverimage}>
        <img src={mission.coverImage} width="50" height="50" />
      </div>
      <div className={styles.title}>
        <p>
          <Link href="/learn/[slug]" as={`/learn/${mission.missionSlug}`}>
            <a className={styles.courseLink}>{mission.title}</a>
          </Link>
        </p>
      </div>
      <div className={styles.instructor}>
        <p>{mission.instructors[0]}</p>
      </div>
      <div className={styles.tracker}>
        <Tracker progress={mission.progress} />
      </div>
    </div>
  );
}

export default UserMissionInfo;
