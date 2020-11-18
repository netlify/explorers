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
import { useRouter } from 'next/router';
import { useUserState } from '@context/user';
import renderToString from 'next-mdx-remote/render-to-string';
import removeMarkdown from 'remove-markdown';
import { findTwitterUrl, parseTwitterHandle } from '@util/twitter';
import { SITE_DOMAIN } from '@util/constants';
import { getVideoUrls } from '@util/cloudinary';

export default function Stage({
  currentStageIndex,
  mission,
  stage,
  isFinalStage,
  videoUrls,
}) {
  const router = useRouter();
  const publicId = stage.content?.[0].cloudinaryVideo?.public_id;
  const poster = stage.content?.[0].coverImage?.asset.url;
  const description = hydrate(stage.renderedStageDescription);
  const descriptionMarkdown = stage.content?.[0].body;
  const descriptionMeta = removeMarkdown(
    descriptionMarkdown?.split('\n')?.[0] ?? ''
  );
  const [missionComplete, setMissionComplete] = useState(false);
  const { user, getUser } = useUserState();

  const instructorTwitterHandle = parseTwitterHandle(
    findTwitterUrl(mission.instructor.social)
  );

  const ogImage = `https://res.cloudinary.com/netlify/video/upload/q_auto,w_1280,h_720,c_fill,f_auto,so_2/l_text:Roboto_80_center:${stage.title},co_white,w_1000,c_fit/explorers/intro.jpg`;

  const pageMeta = {
    title: `${stage.title} - ${mission.title} - Jamstack Explorers`,
    description: descriptionMeta,
    url: `${SITE_DOMAIN}/learn/${mission.slug.current}/${stage.slug.current}`,
    image: ogImage,
    creator: instructorTwitterHandle
      ? `@${instructorTwitterHandle}`
      : '@netlify',
  };

  const closeModal = () => {
    setMissionComplete(false);
  };

  const emitStageComplete = () => {
    const currentMission = user.activity.userMissions.find(
      (userMission) => userMission.title === mission.title
    );

    getUser();

    const localCookieName = `finalMissionConfetti-${mission.title}`;

    // Note: user.activity.userMissions will not include the current mission
    // until at least one lesson is completed, so currentMission will be undefined
    // in this function when the first lesson is watched/being finished
    if (
      currentMission &&
      currentMission.progress >= 1 &&
      !window.localStorage.getItem(localCookieName)
    ) {
      setMissionComplete(true);
      window.localStorage.setItem(localCookieName, 'true');
    }

    if (!isFinalStage) {
      const nextStage = mission.stages[currentStageIndex + 1];
      router.replace(
        `/learn/${mission.slug.current}/${nextStage.slug.current}`
      );
    }
  };

  return (
    <Layout navtheme="dark" pageMeta={pageMeta}>
      <section className="px2">
        <div
          className={`${styles['stage-content-wrapper']} section-contain margintop-lg`}
        >
          <div>
            <h2 className={styles['stage-title']}>
              {mission.title}{' '}
              <span className={styles['stage-title-addendum']}>
                with {mission.instructor.name}
              </span>
            </h2>
          </div>

          <div className={styles['stage-content']}>
            <div>
              {publicId && (
                <VideoPlayer
                  videoUrls={videoUrls}
                  publicId={publicId}
                  poster={poster}
                  title={stage.title}
                  emitStageComplete={emitStageComplete}
                />
              )}
              <LoginNudge />

              {description && (
                <section className={styles['description-wrapper']}>
                  {description}
                </section>
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

  const currentStageIndex = mission.stages.findIndex(
    (s) => s.title === stage.title
  );
  const isFinalStage = currentStageIndex === mission.stages.length - 1;

  const renderedStageDescription = await renderToString(
    stage.content?.[0].body,
    {}
  );

  const videoUrls = await getVideoUrls({
    title: stage.title,
    publicId: stage.content?.[0].cloudinaryVideo?.public_id,
    isFinalStage,
  });

  return {
    props: {
      mission,
      stage: {
        ...stage,
        renderedStageDescription,
      },
      isFinalStage,
      videoUrls,
      currentStageIndex,
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
