import Layout from '@components/Layout';
import MissionTracker from '@components/MissionTracker';
import VideoPlayer from '@components/VideoPlayer';
import { loadMissionBySlug, loadMissions } from '@context/missions';
import { loadStageBySlug } from '@context/stages';
import Link from 'next/link';
import styles from './Stage.module.css';

export default function Stage({
  missionInstructor,
  missionSlug,
  missionStages,
  missionTitle,
  stage,
}) {
  const publicId = stage.content?.[0].cloudinaryVideo.public_id;

  return (
    <Layout navtheme="dark">
      <div>
        <section>
          <div className="sectioncontain margintop-md">
            <div className={styles.stageContent}>
              <div>
                <h2 className={styles.stageTitle}>
                  {missionTitle}{' '}
                  <span className={styles.stageTitleAddendum}>
                    with {missionInstructor.name}
                  </span>
                </h2>
                {publicId && <VideoPlayer publicId={publicId} />}
              </div>
              <div>
                <MissionTracker
                  stages={missionStages}
                  currentMission={missionSlug}
                  currentStage={stage.slug.current}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const mission = await loadMissionBySlug(params.mission);
  const stage = await loadStageBySlug(params.stage);

  return {
    props: {
      missionInstructor: mission.instructor,
      missionSlug: params.mission,
      missionStages: mission.stages,
      missionTitle: mission.title,
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
