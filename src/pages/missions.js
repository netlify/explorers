import Layout from '@components/Layout';
import MissionCard from '@components/MissionCard';
import { useMissionsState } from '@context/missions';
import { renderMdxContent } from '@util/mdxClient';
import { loadMdxContent } from '@util/mdxServer';
import mission from 'backend/schemas/mission';

export default function MissionsPage({ rawContent }) {
  const { missions } = useMissionsState();

  const missionIntroContent = renderMdxContent(rawContent);

  const pageMeta = {
    title: 'Jamstack Explorers - Mission',
    description:
      'See all of the missions you can embark on in Jamstack Explorers!',
    url: 'https://explorers.netlify.com/missions',
  };

  return (
    <Layout navtheme="dark" pageMeta={pageMeta}>
      <div>
        <section className="intro">
          <div className="section-contain is-dark">{missionIntroContent}</div>
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
