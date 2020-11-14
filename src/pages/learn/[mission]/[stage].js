import Layout from '@components/Layout';
import VideoPlayer from '@components/VideoPlayer';
import ChonkyFooter from '@components/ChonkyFooter';
import MissionTracker from '@components/MissionTracker';
import LoginNudge from '@components/LoginNudge';
import { loadMissionBySlug, loadMissions } from '@context/missions';
import { loadStageBySlug } from '@context/stages';
import styles from './Stage.module.css';
import marked from 'marked';
import parser from 'html-react-parser';

export default function Stage({ mission, stage }) {
  const publicId = stage.content?.[0].cloudinaryVideo?.public_id;
  const poster = stage.content?.[0].coverImage?.asset.url;
  const description = stage.content?.[0].body;

  const descriptionHtmlString = marked(description);
  const descriptionParsed = parser(descriptionHtmlString);

  return (
    <Layout navtheme="dark">
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
            {publicId && <VideoPlayer publicId={publicId} poster={poster} />}
            <LoginNudge />

            {description && (
              <div className={styles['description-wrapper']}>
                {descriptionParsed}
              </div>
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

      <ChonkyFooter mission={mission} />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const mission = await loadMissionBySlug(params.mission);
  const stage = await loadStageBySlug(params.stage);

  return {
    props: {
      mission,
      stage,
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
