import styles from './UserActivityGraph.module.css';
import { AreaChart } from 'react-chartkick';
import 'chart.js';

function UserActivityGraph() {
  return (
    <div className={styles.activity}>
      <div className={styles.activitychart}>
        <AreaChart
          data={{
            '2017-05-13': 2,
            '2017-05-14': 5,
            '2017-05-15': 6,
            '2017-05-16': 0,
          }}
          colors={['magenta', '#333']}
          ytitle="Minutes Watched"
          width="500px"
          height="300px"
          id={1}
          points={false}
        />
      </div>

      <div>
        <AreaChart
          data={{
            '2017-05-13': 2,
            '2017-05-14': 5,
            '2017-05-15': 6,
            '2017-05-16': 0,
          }}
          colors={['purple', '#333']}
          ytitle="Minutes Watched"
          width="500px"
          height="300px"
          id={2}
          points={false}
        />
      </div>
    </div>
  );
}

export default UserActivityGraph;
