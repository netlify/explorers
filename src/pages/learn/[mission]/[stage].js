import MissionTracker from '@components/MissionTracker';
import VideoPlayer from '@components/VideoPlayer';
import { loadMissions } from '@context/missions';
import Link from 'next/link';

export default function Stage({ mission, stage }) {
  return (
    <>
      <p>stage: {stage}</p>
      <Link href={`/learn/${mission}`}>
        <a>{mission}</a>
      </Link>
      <VideoPlayer />
      <MissionTracker />
    </>
  );
}

export function getStaticProps({ params }) {
  return {
    props: {
      mission: params.mission,
      stage: params.stage,
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
