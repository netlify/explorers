import styles from './MissionSummary.module.css';

function MissionSummary({ title, description, stages }) {
  return (
    <div className={styles.missionSummary}>
      <div className={styles.missionTitle}>
        <h2>{title}</h2>
      </div>
      <div className={styles.missionDescription}>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default MissionSummary;
