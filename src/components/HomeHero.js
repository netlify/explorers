import styles from './HomeHero.module.css';
import Astronaut from '@components/Astronaut';

function HomeHero({ textcontent }) {
  return (
    <section className={styles.hero}>
      <div className={`${styles.herocontain} sectioncontain`}>
        <div>
          <h1>Jamstack Explorers</h1>
          <h2>Learning Platform</h2>
          <p>
            Greetings, fellow explorer! Welcome to your mission control — a
            place to learn about building for the web with modern tools and
            techniques. As a Jamstack Explorer, you can chart a course through
            new frameworks, through bright new tools and APIs, through{' '}
            <a href="https://netlify.com">Netlify</a>'s features and workflows,
            and through the very fabric of HTML, CSS, and JavaScript itself.
          </p>
          <p>
            Choose your mission. Track your progress. Earn rewards. And join us
            as we explore the Jamstack together!
          </p>
          <p>{textcontent}</p>
        </div>

        <div className={styles.astronautcontain}>
          <Astronaut />
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
