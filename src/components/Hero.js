import styles from './Hero.module.css';

function Hero({ children }) {
  return (
    <section className={styles.hero}>
      <div className={`${styles['hero-contain']} sectioncontain`}>
        {children}
      </div>
    </section>
  );
}

export default Hero;
