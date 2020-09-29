import MissionSummary from '../../components/MissionSummary';
import { useMissionsState } from '../../context/missions';

export default function Missions({ pageProps }) {
  const { missions } = useMissionsState();

  return missions.map((mission) => (
    <MissionSummary
      key={mission._id}
      title={mission.title}
      description={mission.description}
    />
  ));
}
