import AvatarRow from './AvatarRow';
import styles from './MissionCard.module.css';
import Link from 'next/link';

const MissionCard = ({ mission }) => {
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url(${mission.coverImage.asset.url})`,
      }}
    >
      <div className={styles['card-info']}>
        <h3>{mission.title}</h3>
        <div className={styles['card-description']}>
          <p>{mission.blurb}</p>
        </div>

        <div className={styles['card-footer']}>
          <AvatarRow
            src={mission.instructor.avatar.asset.url}
            label={mission.instructor.name}
          />
          <div className={styles['card-button']}>
            <Link href="/learn/[slug]" as={`/learn/${mission.slug.current}`}>
              <a className="btn btndark">Launch Mission</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;
