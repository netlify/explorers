import Layout from '@components/Layout';
import MissionCard from '@components/MissionCard';
import { useMissionsState } from '@context/missions';
import { renderMdxContent } from '@util/mdxClient';
import { loadMdxContent } from '@util/mdxServer';
import { SITE_DOMAIN } from '@util/constants';
import DarkBox from '@components/DarkBox';

export default function MissionsPage({ rawContent }) {
  const { missions } = useMissionsState();

  const missionIntroContent = renderMdxContent(rawContent);

  const pageMeta = {
    title: 'Missions - Jamstack Explorers',
    description:
      'See all of the missions you can learn from on Jamstack Explorers!',
    url: `${SITE_DOMAIN}/missions`,
  };

  return (
    <Layout navtheme="dark" pageMeta={pageMeta}>
      <div>
        <section className="intro">
          <DarkBox className="section-contain">{missionIntroContent}</DarkBox>
        </section>

        <section>
          <div className="row section-contain">
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
  const rawContent = await loadMdxContent('mission-intro');

  return {
    props: {
      rawContent,
    },
  };
}
