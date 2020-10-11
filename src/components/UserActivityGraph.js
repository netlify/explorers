import styles from './UserActivityGraph.module.css';
import { AreaChart } from 'react-chartkick';
import 'chart.js';

function UserActivityGraph() {
  const placeholderdata = {
    '2017-05-13': 2,
    '2017-05-14': 5,
    '2017-05-15': 2,
    '2017-05-16': 6,
    '2017-05-17': 1,
    '2017-05-18': 4,
  };

  return (
    <div className={styles.activity}>
      <div className={styles.activitychart}>
        <AreaChart
          data={placeholderdata}
          colors={['magenta', '#333']}
          ytitle="Minutes Watched"
          width="600px"
          height="200px"
          id={1}
          points={false}
        />
      </div>

      <div>
        <AreaChart
          data={placeholderdata}
          colors={['purple', '#333']}
          ytitle="Minutes Watched"
          width="600px"
          height="200px"
          id={2}
          points={false}
        />
      </div>
    </div>
  );
}

export default UserActivityGraph;
