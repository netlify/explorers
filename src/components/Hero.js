import styles from './Hero.module.css';
import Astronaut from '@components/Astronaut';

function Hero({ children }) {
  return (
    <section className={styles.hero}>
      <div className={`${styles.herocontain} sectioncontain`}>{children}</div>
    </section>
  );
}

export default Hero;
