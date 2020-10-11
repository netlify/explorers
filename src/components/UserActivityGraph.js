import styles from './UserActivityGraph.module.css';
import { AreaChart } from 'react-chartkick';
import 'chart.js';

function UserActivityGraph() {
  const placeholderdata = {
    '2017-05-13': 2,
    '2017-05-14': 5,
    '2017-05-15': 4,
    '2017-05-16': 6,
    '2017-05-17': 1,
    '2017-05-18': 4,
  };

  const opts = {
    title: 'Minutes Watched',
    width: '600px',
    height: '200px',
    points: false,
  };

  return (
    <div className={styles.activity}>
      <div className={styles.activitychart}>
        <AreaChart
          data={placeholderdata}
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
          data={placeholderdata}
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
