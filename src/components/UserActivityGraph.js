import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { AreaChart } from 'react-chartkick';
import 'chart.js';
import { useUserState } from 'src/context/user';
import styles from './UserActivityGraph.module.css';

function UserActivityGraph() {
  const { user } = useUserState();

  const [opts, setOpts] = useState({
    title: 'Videos Watched',
    width: 'inherit',
    height: '200px',
    points: false,
  });

  const onResize = (activityCard) => {
    setOpts({
      ...opts,
      width: `${activityCard.clientWidth - 100}px`,
    });
  };

  useEffect(() => {
    const activityCard = document.querySelector('#user-activity-card');
    const handleResize = debounce(() => onResize(activityCard), 250);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.activity}>
      <div>
        <AreaChart
          data={user.activity.activeDates}
          colors={['MediumVioletRed', '#333']}
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
