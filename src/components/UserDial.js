import React, { useEffect, useState } from 'react';
import styles from './UserDial.module.css';
import { useUserState } from 'src/context/user';
import gsap from 'gsap';
import ModalCertLoading from '@components/ModalCertLoading';
import { launchFireworkConfetti } from '../util/confetti';

function UserDial() {
  const { user } = useUserState();
  const [showModal, setShowModal] = useState(false);
  const progress = user.activity.certificateProgress;

  function closeModal() {
    setShowModal(false);
  }

  function getCertificate(event) {
    event.preventDefault();

    const certURL = new URL(
      window.location.origin + '/.netlify/functions/certificate-3-missions'
    );
    certURL.searchParams.set('name', user.full_name);
    certURL.searchParams.set('date', new Date().toLocaleDateString());

    window.location = certURL;
    setShowModal(true);
  }

  const isComplete = parseInt(progress) === 1;

  useEffect(() => {
    gsap.set('.dial', {
      rotation: 180 * progress + 1,
      svgOrigin: '500 500',
    });

    gsap.set('.texttransform', {
      rotation: -90,
      y: progress == 0 ? -15 : 0,
      fontSize: progress == 0 ? '30px' : '20px',
      transformOrigin: '50% 50%',
    });

    if (isComplete && !window.localStorage.getItem('finalConfetti')) {
      launchFireworkConfetti();
      window.localStorage.setItem('finalConfetti', 'true');
    }
  });

  return (
    <div className={isComplete ? styles.complete : ''}>
      {isComplete ? (
        <>
          <h4 className={styles.completeHeading}>You did it!</h4>
          <img
            className={styles.completeImage}
            src="https://res.cloudinary.com/netlify/image/upload/q_auto,f_auto,w_200/v1605058349/explorers/boppin-pug.gif"
            alt="a pug dancing happily"
          />
          <a
            className="btn btnprimary"
            href="#certificate"
            onClick={getCertificate}
          >
            View and Download Your Certificate
          </a>
          <button
            className={styles['replay-button']}
            onClick={launchFireworkConfetti}
          >
            Replay confetti animation
          </button>
        </>
      ) : (
        <svg
          viewBox="100 150 800 350"
          xmlns="http://www.w3.org/2000/svg"
          aria-labelledby="knob"
          role="presentation"
          className={styles.dial}
        >
          <title id="knob">User Profile Dial</title>
          <defs>
            <clipPath id="clip">
              <rect className="dial" x="0" y="0" width="1000" height="500" />
            </clipPath>
          </defs>

          <g>
            <circle className={styles.stroke1b} r="300" cx="500" cy="500" />
            <circle className={styles.stroke1b} r="265" cx="500" cy="500" />
            <circle className={styles.stroke2b} r="220" cx="500" cy="500" />
            <circle className={styles.stroke3b} r="170" cx="500" cy="500" />
            <circle className={styles.stroke1b} r="120" cx="500" cy="500" />
          </g>

          <g clipPath="url(#clip)">
            <circle className={styles.stroke1} r="300" cx="500" cy="500" />
            <circle className={styles.stroke1} r="265" cx="500" cy="500" />
            <circle className={styles.stroke2} r="220" cx="500" cy="500" />
            <circle className={styles.stroke3} r="170" cx="500" cy="500" />
            <circle className={styles.stroke1} r="120" cx="500" cy="500" />
          </g>

          <g className="dial">
            <line
              className={styles.line1}
              x1="200"
              x2="500"
              y1="500"
              y2="500"
            />
            <circle className={styles.knob} r="6" cx="200" cy="500" />
            <text className="texttransform" fill="#ccc" x="160" y="510">
              {progress * 100}%
            </text>
          </g>

          <line className={styles.line1} x1="150" x2="850" y1="499" y2="499" />
          <circle className={styles.knob} r="20" cx="500" cy="500" />
        </svg>
      )}
      {showModal ? <ModalCertLoading closeModal={closeModal} /> : ''}
    </div>
  );
}

export default UserDial;
