import styles from './UserMaincontent.module.css';

function UserMaincontent({ user }) {
  return (
    <aside className={styles.main}>
      <div className={styles.section}>
        <div className={styles.profilecard}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime repellat iste alias est, odio voluptates blanditiis labore asperiores dolore! Officiis a optio fugiat quia quisquam quos ullam sunt illo impedit.
        </div>
      </div>
    </aside>
  );
}

export default UserMaincontent;
