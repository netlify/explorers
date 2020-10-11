import React, { useEffect } from 'react';
import styles from './UserDial.module.css';
import gsap from "gsap";

function UserDial({ progress = 0.44 }) {
  useEffect(() => {
    gsap.set('.dial', {
      rotation: 180 * progress,
      svgOrigin: '500 500'
    })

    gsap.set('.texttransform', {
      rotation: -90,
      transformOrigin: '50% 50%'
    })
  });

  return (
    <svg viewBox="100 100 800 400" xmlns="http://www.w3.org/2000/svg" aria-labelledby="knob" role="presentation">
      <title id="knob">User Profile Dial</title>
      <defs>
        <clipPath id="clip">
          <rect class="dial" x="0" y="0" width="1000" height="500" />
        </clipPath>
      </defs>

      <g>
        <circle className={styles.stroke1b} r="300" cx="500" cy="500" />
        <circle className={styles.stroke1b} r="265" cx="500" cy="500" />
        <circle className={styles.stroke2b} r="220" cx="500" cy="500" />
        <circle className={styles.stroke3b} r="170" cx="500" cy="500" />
        <circle className={styles.stroke1b} r="120" cx="500" cy="500" />
      </g>

      <g clip-path="url(#clip)">
        <circle className={styles.stroke1} r="300" cx="500" cy="500" />
        <circle className={styles.stroke1} r="265" cx="500" cy="500" />
        <circle className={styles.stroke2} r="220" cx="500" cy="500" />
        <circle className={styles.stroke3} r="170" cx="500" cy="500" />
        <circle className={styles.stroke1} r="120" cx="500" cy="500" />
      </g>


      <g class="dial">
        <line className={styles.line1} x1="200" x2="500" y1="500" y2="500" />
        <circle className={styles.knob} r="6" cx="200" cy="500" />
        <text
          class="texttransform"
          font-size="20px"
          fill="#ccc"
          x="160"
          y="510">
          {progress * 100}
        </text>
      </g>

      <line className={styles.line1} x1="150" x2="850" y1="499" y2="499" />
      <circle className={styles.knob} r="20" cx="500" cy="500" />
    </svg>
  );
}

export default UserDial;
