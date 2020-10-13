import MissionTracker from '@components/MissionTracker';
import VideoPlayer from '@components/VideoPlayer';
import { loadMissions } from '@context/missions';
import { loadStageBySlug } from '@context/stages';
import Link from 'next/link';

export default function Stage({ mission, stage, stageSlug }) {
  console.log(stage);
  const publicId = stage.content?.[0].cloudinaryVideo.public_id;
  return (
    <>
      <p>stage: {stageSlug}</p>
      <Link href={`/learn/${mission}`}>
        <a>{mission}</a>
      </Link>
      {publicId && <VideoPlayer publicId={publicId} />}
      <MissionTracker />
    </>
  );
}

export async function getStaticProps({ params }) {
  const stage = await loadStageBySlug(params.stage);
  return {
    props: {
      mission: params.mission,
      stageSlug: params.stage,
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
