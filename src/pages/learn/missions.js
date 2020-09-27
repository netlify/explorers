import MissionSummary from '../../components/MissionSummary';
import { MissionsProvider } from '../../context/missions';

export default function Missions({ pageProps }) {
  return (
    <MissionsProvider>
      <MissionSummary {...pageProps}></MissionSummary>
    </MissionsProvider>
  );
}