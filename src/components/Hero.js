import styles from './Hero.module.css';

function Hero({ children }) {
  return (
    <section className={styles.hero}>
      <div className={`${styles.herocontain} sectioncontain`}>{children}</div>
    </section>
  );
}

export default Hero;
