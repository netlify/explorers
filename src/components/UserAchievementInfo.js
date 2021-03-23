// import styles from './UserCourseInfo.module.css';
import styles from './UserAchievement.module.css';
import Rosette from '@components/Rosette';

function UserAchievementInfo({ achievements }) {
  const [showCode, setShowCode] = React.useState(false);
  const disCountCode = achievements.rewards[0].reward_data.code;
  return (
    <div className={styles.coursecontainer}>
      <div className={styles.coverimage}>
        <Rosette width="35" height="35" />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <p className={styles.courseLink}>{achievements.type}</p>
        </div>
        <div className={styles.description}>
          <p>{achievements.description}</p>
        </div>
        <div>
          {achievements.rewards[0].is_claimed === false ? (
            <div>
              <button
                onClick={() => setShowCode(true)}
                className={styles.btnclaim}
              >
                Claim Reward
              </button>
              {showCode ? (
                <p
                  onClick={() => {
                    navigator.clipboard.writeText(disCountCode);
                  }}
                  className={styles.discount}
                >
                  Your Discount Code 👉🏼👉🏼 {disCountCode}
                </p>
              ) : null}
            </div>
          ) : achievements.rewards[0].is_claimed === true ? (
            <button className={styles.btnclaimed}>Claimed </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default UserAchievementInfo;
