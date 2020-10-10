import styles from './UserSidebar.module.css';
import UserProfilesvg from '@components/UserProfilesvg';

function UserSidebar({ user }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>
        <UserProfilesvg user={user} />
      </div>
    </div>
  );
}

export default UserSidebar;
