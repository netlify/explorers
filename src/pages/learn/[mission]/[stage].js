import Layout from '@components/Layout';
import MissionTracker from '@components/MissionTracker';
import VideoPlayer from '@components/VideoPlayer';
import { loadMissionBySlug, loadMissions } from '@context/missions';
import { loadStageBySlug } from '@context/stages';
import styles from './Stage.module.css';

export default function Stage({ mission, stage }) {
  const publicId = stage.content?.[0].cloudinaryVideo?.public_id;
  const poster = stage.content?.[0].coverImage?.asset.url;

  return (
    <Layout navtheme="dark">
      <article>
        <div className="sectioncontain margintop-md">
          <div className={styles['stage-content']}>
            <section>
              <h2 className={styles['stage-title']}>
                {mission.title}{' '}
                <span className={styles['stage-title-addendum']}>
                  with {mission.instructor.name}
                </span>
              </h2>
              {publicId && <VideoPlayer publicId={publicId} poster={poster} />}
            </section>
            <aside>
              <MissionTracker
                stages={mission.stages}
                currentMission={mission.slug.current}
                currentStage={stage.slug.current}
              />
            </aside>
          </div>
        </div>
      </article>
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

  // TODO build this array of paths
  return {
    paths: stagePaths,
    fallback: false,
  };
};
