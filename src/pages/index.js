import { loadMdxContent } from '@util/mdxServer';
import { renderMdxContent } from '@util/mdxClient';

import Layout from '@components/Layout';
import HomeHero from '@components/HomeHero';
import MissionCard from '@components/MissionCard';
import { useMissionsState } from '@context/missions';

export default function Home({ content, homeHeroContent }) {
  const { missions } = useMissionsState();

  const pageContent = renderMdxContent(content);

  return (
    <Layout navtheme="light">
      <div>
        <HomeHero content={homeHeroContent} />

        <section className="margintop-lg">
          <div className="sectioncontain">{pageContent}</div>

          <div className="row sectioncontain">
            {missions.map((mission, index) => (
              <MissionCard key={index} mission={mission} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const renderedContent = await loadMdxContent('mission-control');
  const homeHeroContent = await loadMdxContent('home-hero');

  return {
    props: {
      content: renderedContent,
      homeHeroContent,
    },
  };
}
