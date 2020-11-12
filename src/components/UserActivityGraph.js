import styles from './UserActivityGraph.module.css';
import { AreaChart } from 'react-chartkick';
import { useUserState } from 'src/context/user';
import 'chart.js';
import { useMediaQuery } from '../hooks/useMediaQuery';

function UserActivityGraph() {
  const { user } = useUserState();

  const isLargeMobile = useMediaQuery('(min-width: 500px');
  const isTablet = useMediaQuery('(min-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 1000px');

  const chartSize = () => {
    if (isDesktop) {
      return '600px';
    } else if (isTablet) {
      return '550px';
    } else if (isLargeMobile) {
      return '450px';
    } else {
      return '250px';
    }
  };

  const opts = {
    title: 'Videos Watched',
    width: chartSize(),
    height: '200px',
    points: false,
  };

  return (
    <div className={styles.activity}>
      <div className={styles.activitychart}>
        <AreaChart
          data={user.activity.activeDates}
          colors={['magenta', '#333']}
          ytitle={opts.title}
          width={opts.width}
          height={opts.height}
          points={opts.points}
          id={1}
        />
      </div>

      <div>
        <AreaChart
          data={user.activity.activeDates}
          colors={['purple', '#333']}
          ytitle={opts.title}
          width={opts.width}
          height={opts.height}
          points={opts.points}
          id={2}
        />
      </div>
    </div>
  );
}

export default UserActivityGraph;
