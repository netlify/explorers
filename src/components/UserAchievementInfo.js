import styles from './UserAchievementInfo.module.css';
import Rosette from '@components/Rosette';
import CopyButton from '@components/CopyButton';

function UserAchievementInfo({ achievements }) {
  const discountCode = achievements?.rewards?.[0]?.reward_data?.code || false;

  if (!discountCode) {
    return null;
  }

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
              <span className={styles.claim}>Reward Unlocked </span>
              <div className={styles.description}>
                <p className="rewards">
                  Congratulations, Explorer! You've unlocked the reward code
                  below, which you can copy and use at the{' '}
                  <a href="https://swag.netlify.com/">Netlify Swag Store</a>{' '}
                  during checkout to get{' '}
                  <a href="https://swag.netlify.com/product/jamstack-sticker-packs">
                    these stickers
                  </a>{' '}
                  for free!
                </p>
              </div>
              <div className={styles.discount}>
                <p
                  onClick={() => {
                    navigator.clipboard.writeText(discountCode);
                  }}
                >
                  {discountCode}{' '}
                  <span className={styles.copy}>
                    <CopyButton />
                  </span>
                </p>
              </div>
            </div>
          ) : achievements.rewards[0].is_claimed === true ? (
            <span className={styles.claimed}>Claimed </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default UserAchievementInfo;
