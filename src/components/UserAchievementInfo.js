import styles from './UserAchievementInfo.module.css';
import Rosette from '@components/Rosette';

function UserAchievementInfo({ achievements }) {
  const disCountCode = achievements.rewards[0].reward_data.code;
  return (
    <div className={styles.achievementcontainer}>
      <div>
        <Rosette width="35" height="35" />
      </div>
      <div>
        <div className={styles.title}>
          <p>{achievements.type}</p>
        </div>
        <div className={styles.description}>
          <p>{achievements.description}</p>
        </div>
        <div>
          {achievements.rewards[0].is_claimed === false ? (
            <div className={styles.rewardcontent}>
              <button className={styles.btnclaim}>Reward Unlocked</button>
              <div className={styles.description}>
                <p>
                  Congratulations, Explorer! You've unlocked the reward code
                  below, which you can copy and use at the{' '}
                  <a className={styles.link} href="https://swag.netlify.com/">
                    Netlify Swag Store
                  </a>{' '}
                  during checkout to get{' '}
                  <a
                    className={styles.link}
                    href="https://swag.netlify.com/product/jamstack-sticker-packs"
                  >
                    these stickers
                  </a>{' '}
                  for free!
                </p>
              </div>
              <div className={styles.discount}>
                <p
                  onClick={() => {
                    navigator.clipboard.writeText(disCountCode);
                  }}
                >
                  {disCountCode}
                </p>
              </div>
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
