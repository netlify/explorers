import styles from './Hero.module.css';

function Hero({ children }) {
  return (
    <section className={styles.hero}>
      <div className={`${styles['hero-contain']} section-contain`}>
        {children}
      </div>
    </section>
  );
}

export default Hero;
