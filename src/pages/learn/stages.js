import StageSummary from '../../components/StageSummary';
import { useStagesState } from '../../context/stages';

export default function Stages() {
  const { stages } = useStagesState();

  return stages.map((stage) => (
    <StageSummary key={stage._id} title={stage.title} />
  ));
}
