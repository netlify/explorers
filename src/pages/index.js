import { loadMdxContent } from '@util/mdxServer';
import { renderMdxContent } from '@util/mdxClient';

import Layout from '@components/Layout';
import HomeHero from '@components/HomeHero';
import MissionCard from '@components/MissionCard';
import { useMissionsState } from '@context/missions';

export default function Home({ rawMissionControlContent, rawHomeHeroContent }) {
  const { missions } = useMissionsState();

  const missionControlContent = renderMdxContent(rawMissionControlContent);

  return (
    <Layout navtheme="light">
      <div>
        <HomeHero rawcontent={rawHomeHeroContent} />

        <section className="margintop-lg">
          <div className="sectioncontain">{missionControlContent}</div>

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
  const rawMissionControlContent = await loadMdxContent('mission-control');
  const rawHomeHeroContent = await loadMdxContent('home-hero');

  return {
    props: {
      rawMissionControlContent,
      rawHomeHeroContent,
    },
  };
}
