import UserMaincontent from './UserMaincontent';
import styles from './UserProfilesvg.module.css';

function UserProfilesvg({ user }) {
  return (
    <svg className={styles.svg} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-labelledby="usersvg" role="presentation">
      <title id="usersvg">User Profile Photo</title>  
      <defs>
        <clipPath id="userclip" clipPathUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="35"/>
        </clipPath>
      </defs>  

      <circle r="50" cx="50" cy="50" />
      <image href={user.avatar_url} x="15" y="15" height="70" width="70" clipPath="url(#userclip)" />
    </svg>
  );
}

export default UserProfilesvg;