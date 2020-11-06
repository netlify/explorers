import styles from './Hamburger.module.css';

function Hamburger({ theme, isActive, ...props }) {
  return (
    <div
      className={`${styles.hamburger} ${
        theme === 'dark' ? styles.navdark : ''
      } ${isActive ? styles.isActive : ''}`}
      {...props}
    >
      <span className={styles.line}></span>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
    </div>
  );
}

export default Hamburger;
