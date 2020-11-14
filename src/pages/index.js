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

  const pageMeta = {
    title: 'Jamstack Explorers',
    description:
      'Take free courses and complete missions about React, Vue, Angular, Netlify and more!',
    image:
      'https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?q=85&fm=jpg&fit=crop&w=1600&h=800',
  };

  return (
    <Layout navtheme="light" pageMeta={pageMeta}>
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
