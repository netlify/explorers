import styles from './UserProfilesvg.module.css';

function UserProfilesvg({ user }) {
  return (
    <svg className={styles.svg} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-labelledby="usersvg" role="presentation">
      <title id="usersvg">User Profile Photo</title>  
      <defs>
        <clipPath id="userclip" clipPathUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="35"/>
        </clipPath>

        <linearGradient id="grad1" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" className={styles.offset1} />
          <stop offset="100%" className={styles.offset2} />
        </linearGradient>

        <linearGradient id="grad2" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" className={styles.offset3} />
          <stop offset="100%" className={styles.offset4} />
        </linearGradient>
      </defs>  

      <circle r="50" cx="50" cy="50" fill="url(#grad1)" />
      <circle r="46" cx="50" cy="50" className={styles.stroke} stroke="url(#grad2)"/>
      <image href={user.avatar_url} x="15" y="15" height="70" width="70" clipPath="url(#userclip)" />
    </svg>
  );
}

export default UserProfilesvg;