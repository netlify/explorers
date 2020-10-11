import styles from './Tracker.module.css';

function Tracker({ progress }) {
  const trackerprogress = parseInt(progress * 680 - 10, 10)
  const start = 20

  return (
    <svg className={styles.svg} viewBox="0 0 700 50" xmlns="http://www.w3.org/2000/svg" aria-labelledby="tracker" role="presentation">
      <title id="tracker">Progress Tracker</title>
      <defs>
        <filter id="dropshadow" x="0" y="0" width="200%" height="200%">
          <feDropShadow dx="3" dy="3" stdDeviation="2" floodColor="#ccc" />
        </filter>
      </defs>

      <line x1={start} x2="680" y1="25" y2="25" className={styles.lineback} />
      <line x1={start} x2={trackerprogress} y1="25" y2="25" className={styles.linefront} stroke="var(--color-pink)" />
      <circle r="15" cy="25" cx={trackerprogress} className={styles.circle} filter="url(#dropshadow)" />
    </svg>
  );
}

export default Tracker;