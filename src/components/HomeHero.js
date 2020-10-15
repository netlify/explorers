import { renderMdxContent } from '@util/mdxClient';

import styles from './HomeHero.module.css';

import Hero from '@components/Hero';
import Astronaut from '@components/Astronaut';

function HomeHero({ rawcontent }) {
  const homeHeroContent = renderMdxContent(rawcontent);

  return (
    <Hero>
      <div>{homeHeroContent}</div>

      <div className={styles.astronautcontain}>
        <Astronaut />
      </div>
    </Hero>
  );
}

export default HomeHero;
