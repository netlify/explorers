import styles from './UserMaincontent.module.css';
import UserActivityGraph from './UserActivityGraph';
import UserCourseInfo from './UserCourseInfo';
import { useUserState } from 'src/context/user';

function UserMaincontent() {
  const { userdata } = useUserState();

  return (
    <aside className={styles.main}>
      <div className={styles.section}>
        <div className={styles.profilecard}>
          <h4 className={styles.profileh4}>Your Activity</h4>
          <UserActivityGraph />
        </div>

        <div className={styles.profilecard}>
          <h4 className={styles.profileh4}>Your Courses</h4>
          {userdata.userCourses.map((course, index) => (
            <UserCourseInfo key={index} course={course} />
          ))}
        </div>
      </div>
    </aside>
  );
}

export default UserMaincontent;
