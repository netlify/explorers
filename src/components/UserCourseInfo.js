import styles from './UserCourseInfo.module.css';

function UserCourseInfo({ course }) {
  return (
    <div className={styles.coursecontainer}>
      <div className={styles.coverimage}>
        <img src={course.coverImage} width="50" height="50" />
      </div>
      <div className={styles.title}>
        <p>{course.title}</p>
      </div>
      <div className={styles.instructor}>
        <p>{course.instructor}</p>
      </div>
      <div className={styles.tracker}>
      </div>
    </div>
  );
}

export default UserCourseInfo;