import styles from './UserMaincontent.module.css';
import UserCourseInfo from './UserCourseInfo';

function UserMaincontent({ user }) {
  const courses = [
    {
      title: 'Vue and Nuxt',
      instructor: 'Sarah Drasner',
      coverImage: 'https://cdn.sanity.io/images/q8efilev/production/e4313495f322e448fec7f41b833b0dabb3799178-800x714.jpg',
      percentCompletion: 0.6
    },
    {
      title: 'Next and React',
      instructor: 'Cassidy Williams',
      coverImage: 'https://cdn.sanity.io/images/q8efilev/production/e4313495f322e448fec7f41b833b0dabb3799178-800x714.jpg',
      percentCompletion: 0.3
    }
  ]

  return (
    <aside className={styles.main}>
      <div className={styles.section}>
        <div className={styles.profilecard}>
          <h3>Courses</h3>
          {courses.map((course, index) => (
            <UserCourseInfo key={index} course={course} />
          ))}
        </div>
      </div>
    </aside>
  );
}

export default UserMaincontent;
