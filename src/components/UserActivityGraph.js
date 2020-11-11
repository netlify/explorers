import styles from './UserActivityGraph.module.css';
import { AreaChart } from 'react-chartkick';
import { useUserState } from 'src/context/user';
import 'chart.js';

function UserActivityGraph() {
  const { user } = useUserState();

  const opts = {
    title: 'Videos Watched',
    width: '550px',
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
