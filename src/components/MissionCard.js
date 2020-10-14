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
      <div className={styles.cardinfo}>
        <div className={styles.carddescription}>
          <h3>{mission.title}</h3>
          <div className="avatarrow">
            <p className="uppercase">{mission.instructor.name}</p>
            <img src={mission.instructor.avatar.asset.url} className="avatar" />
          </div>
        </div>
        <div>
          <p>{mission.blurb}</p>
        </div>
        <div className={styles.cardbutton}>
          <Link href="/learn/[slug]" as={`/learn/${mission.slug.current}`}>
            <a className="btn btndark">Launch Mission</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;
