import hydrate from 'next-mdx-remote/hydrate';
import Layout from '@components/Layout';
import VideoPlayer from '@components/VideoPlayer';
import ChonkyFooter from '@components/ChonkyFooter';
import MissionTracker from '@components/MissionTracker';
import ModalCongrats from '@components/ModalCongrats';
import LoginNudge from '@components/LoginNudge';
import { loadMissionBySlug, loadMissions } from '@context/missions';
import { loadStageBySlug } from '@context/stages';
import styles from './Stage.module.css';
import { useState } from 'react';
import { useUserState } from '@context/user';
import renderToString from 'next-mdx-remote/render-to-string';
import removeMarkdown from 'remove-markdown';
import { findTwitterUrl, parseTwitterHandle } from '@util/twitter';
import { SITE_DOMAIN } from '@util/constants';

export default function Stage({ mission, stage }) {
  const publicId = stage.content?.[0].cloudinaryVideo?.public_id;
  const poster = stage.content?.[0].coverImage?.asset.url;
  const description = hydrate(stage.renderedStageDescription);
  const descriptionMarkdown = stage.content?.[0].body;
  const [missionComplete, setMissionComplete] = useState(false);
  const { user, getUser } = useUserState();

  const instructorTwitterHandle = parseTwitterHandle(
    findTwitterUrl(mission.instructor.social)
  );

  const pageMeta = {
    title: `Jamstack Explorers - ${mission.title} - ${stage.title}`,
    description: removeMarkdown(descriptionMarkdown),
    image: mission.coverImage.asset.url,
    url: `${SITE_DOMAIN}/learn/${mission.slug.current}/${stage.slug.current}`,
    creator: `@${instructorTwitterHandle}` || '@netlify',
  };

  const closeModal = () => {
    setMissionComplete(false);
  };

  const emitStageComplete = () => {
    const currentMission = user.activity.userMissions.find(
      (userMission) => userMission.title === mission.title
    );

    getUser();

    if (currentMission.progress === 1) {
      setMissionComplete(true);
    }
  };

  return (
    <Layout navtheme="dark" pageMeta={pageMeta}>
      <section>
        <div
          className={`${styles['stage-content']} section-contain margintop-lg`}
        >
          <div>
            <h2 className={styles['stage-title']}>
              {mission.title}{' '}
              <span className={styles['stage-title-addendum']}>
                with {mission.instructor.name}
              </span>
            </h2>
            {publicId && (
              <VideoPlayer
                publicId={publicId}
                poster={poster}
                emitStageComplete={emitStageComplete}
              />
            )}
            <LoginNudge />

            {description && (
              <div className={styles['stage-wrapper']}>{description}</div>
            )}
          </div>

          <aside>
            <MissionTracker
              stages={mission.stages}
              currentMission={mission.slug.current}
              currentStage={stage.slug.current}
            />
          </aside>
        </div>
      </section>

      <ChonkyFooter mission={mission} currentStage={stage.slug.current} />
      {missionComplete ? (
        <ModalCongrats mission={mission} closeModal={closeModal} />
      ) : (
        ''
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const mission = await loadMissionBySlug(params.mission);
  const stage = await loadStageBySlug(params.stage);

  const renderedStageDescription = await renderToString(
    stage.content?.[0].body,
    {}
  );

  return {
    props: {
      mission,
      stage: {
        ...stage,
        renderedStageDescription,
      },
    },
  };
}

export const getStaticPaths = async () => {
  const missions = await loadMissions();

  const stagePaths = missions.reduce((paths, mission) => {
    const missionStagePaths = mission.stages
      ? mission.stages.map(
          (stage) => `/learn/${mission.slug.current}/${stage.slug.current}`
        )
      : [];

    return paths.concat(missionStagePaths);
  }, []);

  return {
    paths: stagePaths,
    fallback: false,
  };
};
