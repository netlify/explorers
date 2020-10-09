import MissionStages from '../../components/StageSummary';
import { useStagesState } from '../../context/stages';

export default function Stages() {
  const { stages } = useStagesState();

  return stages.map((stage) => (
    <MissionStages
      key={stage._id}
      title={stage.title}
    />
  ));
}
