import MissionSummary from '@components/MissionSummary';
import StageSummary from '@components/StageSummary';
import { useMissionsState } from '../../context/missions';

export default function Missions() {
  const { missions } = useMissionsState();

  let missionStages = mission.stages.map((stage) => {
    return <StageSummary key={stage._id} title={stage.title} />;
  });

  return missions.map((mission) => (
    <MissionSummary
      key={mission._id}
      title={mission.title}
      description={mission.description}
      stages={missionStages}
    />
  ));
}
