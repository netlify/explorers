import styles from './UserAchievementInfo.module.css';
import Rosette from '@components/Rosette';
import Link from 'next/link';

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
                  Congratulations, explorer! You've unlocked this reward code
                  below, which you can use at the{' '}
                  <Link href="https://swag.netlify.com/">
                    <a>Netlify Swag Store</a>
                  </Link>{' '}
                  during checkout to get{' '}
                  <Link href="https://swag.netlify.com/product/jamstack-sticker-packs">
                    <a>these stickers</a>
                  </Link>{' '}
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
