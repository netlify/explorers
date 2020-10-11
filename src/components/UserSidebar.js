import styles from './UserSidebar.module.css';
import UserProfilesvg from './UserProfilesvg';
import UserRadar from './UserRadar';
import UserDial from './UserDial';
import { useUserState } from 'src/context/user';

function UserSidebar() {
  const { user } = useUserState();

  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>
        <UserProfilesvg className={styles.usersvg} />
        <h3 className={styles.username}>{user.full_name}</h3>
        <h4 className={styles.usertitle}>Captain</h4>

        <hr className={styles.hr} />
        <UserRadar />

        <h4 className={styles.accredidation}>Accredidation</h4>
        <UserDial />
      </div>
    </div>
  );
}

export default UserSidebar;
