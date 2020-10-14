import { loadMdxContent } from '@util/mdxServer';
import { renderMdxContent } from '@util/mdxClient';

import Layout from '@components/Layout';
import HomeHero from '@components/HomeHero';
import MissionCard from '@components/MissionCard';
import { useMissionsState } from '@context/missions';

export default function Home({ content }) {
  const { missions } = useMissionsState();

  const pageContent = renderMdxContent(content);

  return (
    <Layout navtheme="light">
      <div>
        <HomeHero />

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
  const renderedContent = await loadMdxContent('jamstack-mission-control');

  return {
    props: {
      content: renderedContent,
    },
  };
}
