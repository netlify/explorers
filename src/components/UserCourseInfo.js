// import styles from './UserCourseInfo.module.css';

function UserCourseInfo({ course }) {
  return (
    <div>
      <p>{JSON.stringify(course, null, 2)}</p>
    </div>
  );
}

export default UserCourseInfo;