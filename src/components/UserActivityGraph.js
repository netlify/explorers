import styles from './UserActivityGraph.module.css';
import { AreaChart } from 'react-chartkick';
import { useUserState } from 'src/context/user';
import 'chart.js';
import { useEffect, useState } from 'react';

function UserActivityGraph() {
  const { user } = useUserState();

  const [opts, setOpts] = useState({
    title: 'Videos Watched',
    width: '600px',
    height: '200px',
    points: false,
  });

  const onResize = () => {
    const activityCard = document.querySelector('#user-activity-card');
    setOpts({
      ...opts,
      width: `${activityCard.clientWidth - 100}px`,
    });
  };

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

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
