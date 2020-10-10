import styles from './UserSidebar.module.css';
import UserProfilesvg from '@components/UserProfilesvg';
import UserRadar from '@components/UserRadar';

function UserSidebar({ user }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>
        <UserProfilesvg user={user} className={styles.usersvg} />
        <h3 className={styles.username}>{user.full_name}</h3>
        <h4 className={styles.usertitle}>Captain</h4>

        <hr className={styles.hr} />
        <UserRadar />
      </div>
    </div>
  );
}

export default UserSidebar;
