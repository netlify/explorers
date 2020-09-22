import { useMissionsState } from '../context/mission';

const MissionList = () => {
  const state = useMissionsState()
  return (
    <div>
      <pre>{JSON.stringify(state)}</pre>
    </div>
  )
};

export default MissionList;
