import hydrate from 'next-mdx-remote/hydrate';
import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import Layout from '@components/Layout';
import VideoPlayer from '@components/VideoPlayer';
import ChonkyFooter from '@components/ChonkyFooter';
import MissionTracker from '@components/MissionTracker';
import ModalCongrats from '@components/ModalCongrats';
import LoginNudge from '@components/LoginNudge';
import { loadMissionBySlug, loadMissions } from '@context/missions';
import { loadStageBySlug } from '@context/stages';
import styles from './Stage.module.css';
import { useEffect, useState } from 'react';
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
  captionFilePath,
}) {
  const router = useRouter();
  const publicId = stage.content?.[0].cloudinaryVideo?.public_id;
  const posterUrl = stage.content?.[0].coverImage?.asset.url;
  const poster = posterUrl
    ? posterUrl + '?fit=crop&crop=center&fm=jpg&w=1280&h=720'
    : null;
  const description = hydrate(stage.renderedStageDescription);
  const descriptionMarkdown = stage.content?.[0].body;
  const descriptionMeta = removeMarkdown(
    descriptionMarkdown?.split('\n')?.[0] ?? ''
  );
  const [missionComplete, setMissionComplete] = useState(false);
  const { activity, user, getUser } = useUserState();

  let instructorNames;
  let instructorTwitterHandles;

  if (mission.instructors.length > 1) {
    instructorNames = mission.instructors
      .map((instructor) => instructor.name)
      .join(' & ');
    instructorTwitterHandles = mission.instructors
      .map((instructor) =>
        parseTwitterHandle(findTwitterUrl(instructor.social))
      )
      .join(' & ');
  } else {
    instructorNames = mission.instructors[0].name;
    instructorTwitterHandles = parseTwitterHandle(
      findTwitterUrl(mission.instructors[0].social)
    );
  }

  const ogImage = `https://res.cloudinary.com/netlify/video/upload/q_auto,w_1280,h_720,c_fill,f_auto,so_2/l_text:Roboto_80_center:${stage.title},co_white,w_1000,c_fit/explorers/intro.jpg`;

  const pageMeta = {
    title: `${stage.title} - ${mission.title} - Jamstack Explorers`,
    description: descriptionMeta,
    url: `${SITE_DOMAIN}/learn/${mission.slug.current}/${stage.slug.current}`,
    image: ogImage,
    creator: instructorTwitterHandles
      ? `@${instructorTwitterHandles}`
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
      activity.send('mission-complete', {
        path: window.location.pathname,
        mission: currentMission.missionSlug,
      });
      setMissionComplete(true);
      window.localStorage.setItem(localCookieName, 'true');
    }

    if (!isFinalStage) {
      const nextStage = mission.stages[currentStageIndex + 1];
      router.push(`/learn/${mission.slug.current}/${nextStage.slug.current}`);
      router.events.on('routeChangeComplete', () => {
        document.querySelector('video').play();
      });
    }
  };

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setMissionComplete(false);
    });
  });

  return (
    <Layout navtheme="dark" pageMeta={pageMeta}>
      <section>
        <div
          className={`${styles['stage-content-wrapper']} section-contain margintop-lg`}
        >
          <div className="px2">
            <h2 className={styles['stage-main-title']}>
              {mission.title}{' '}
              <span className={styles['stage-title-addendum']}>
                with {instructorNames}
              </span>
            </h2>
            <h2>{stage.title}</h2>
          </div>

          <div className={styles['stage-content']}>
            <div>
              <div className="px2">
                {publicId && (
                  <VideoPlayer
                    videoUrls={videoUrls}
                    publicId={publicId}
                    poster={poster}
                    title={stage.title}
                    emitStageComplete={emitStageComplete}
                    captionFilePath={captionFilePath}
                  />
                )}
                <LoginNudge />
              </div>

              {description && (
                <section className={`${styles['description-wrapper']} px2`}>
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

  // XXX FIXME validate VTT processing & addition
  let captionFilePath = false;
  if (stage.content?.[0].cloudinaryVideo?.captions) {
    const vtt = stage.content?.[0].cloudinaryVideo?.captions;
    const captions = await fetch(vtt).then((res) => res.text());

    const updatedVTT = captions.replace(
      /(\d{2}:\d{2}:\d{2})/gi,
      (timestamp) => {
        const [hours, minutes, seconds] = timestamp.split(':');

        const time = dayjs()
          .set('hour', hours)
          .set('minute', minutes)
          .set('second', seconds);

        return time.add(11, 'seconds').format('HH:mm:ss');
      }
    );

    captionFilePath = `captions/${stage.slug.current}.vtt`;
    fs.writeFileSync(
      path.join(process.cwd(), 'public', captionFilePath),
      updatedVTT,
      'utf-8'
    );
  }

  return {
    props: {
      mission,
      stage: {
        ...stage,
        renderedStageDescription,
      },
      captionFilePath,
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
