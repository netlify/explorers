import styles from './UserMaincontent.module.css';
import UserActivityGraph from '@components/UserActivityGraph';
import UserCourseInfo from './UserCourseInfo';

function UserMaincontent({ user }) {
  const courses = [
    {
      title: 'Vue and Nuxt',
      instructor: 'Sarah Drasner',
      coverImage:
        'https://cdn.sanity.io/images/q8efilev/production/e4313495f322e448fec7f41b833b0dabb3799178-800x714.jpg',
      progress: 0.6,
    },
    {
      title: 'Next and React',
      instructor: 'Cassidy Williams',
      coverImage:
        'https://cdn.sanity.io/images/q8efilev/production/e4313495f322e448fec7f41b833b0dabb3799178-800x714.jpg',
      progress: 0.3,
    },
  ];

  return (
    <aside className={styles.main}>
      <div className={styles.section}>
        <div className={styles.profilecard}>
          <h4 className={styles.profileh4}>Your Activity</h4>
          <UserActivityGraph />
        </div>

        <div className={styles.profilecard}>
          <h4 className={styles.profileh4}>Your Courses</h4>
          {courses.map((course, index) => (
            <UserCourseInfo key={index} course={course} />
          ))}
        </div>
      </div>
    </aside>
  );
}

export default UserMaincontent;
