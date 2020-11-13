import { loadMdxContent } from '@util/mdxServer';
import { renderMdxContent } from '@util/mdxClient';
import { launchFireworkConfetti } from '@util/confetti';

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

        <section>
          <section className="section-contain intro-video-wrapper">
            <video controls className="intro-video">
              <source
                src="https://res.cloudinary.com/netlify/video/upload/v1605216108/explorers/explorers-intro.mp4"
                type="video/mp4"
              />
              Sorry. Your browser does not support embedded videos.
            </video>
          </section>

          <div className="section-contain is-dark prose marginbottom-sm">
            {missionControlContent}
          </div>

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
  const rawMissionControlContent = await loadMdxContent('mission-control');
  const rawHomeHeroContent = await loadMdxContent('home-hero');

  return {
    props: {
      rawMissionControlContent,
      rawHomeHeroContent,
    },
  };
}
