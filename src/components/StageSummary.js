function StageSummary({ title }) {
  return (
    <div className={styles.stageSummary}>
      <div className={styles.stageTitle}>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

export default StageSummary;
