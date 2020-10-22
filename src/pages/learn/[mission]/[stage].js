import Layout from '@components/Layout';
import MissionTracker from '@components/MissionTracker';
import VideoPlayer from '@components/VideoPlayer';
import { loadMissions } from '@context/missions';
import { loadStageBySlug } from '@context/stages';
import Link from 'next/link';
import styles from './Stage.module.css';

export default function Stage({ mission, stage }) {
  const publicId = stage.content?.[0].cloudinaryVideo.public_id;
  return (
    <Layout navtheme="dark">
      <div>
        <section>
          <div className="sectioncontain margintop-lg">
            <div className={styles.stagecontent}>
              <div>
                <p>stage: {stage.slug.current}</p>
                <Link href={`/learn/${mission}`}>
                  <a>{mission}</a>
                </Link>
                {publicId && <VideoPlayer publicId={publicId} />}
              </div>
              <div>
                <MissionTracker />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const stage = await loadStageBySlug(params.stage);
  return {
    props: {
      mission: params.mission,
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
