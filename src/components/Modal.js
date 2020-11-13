import { useEffect } from 'react';
import {
  launchFireworkConfetti,
  launchSchoolPrideConfetti,
} from '../util/confetti';
import styles from './Modal.module.css';
import IconClose from './IconClose';
import Link from 'next/link';

function Modal({ mission, closeModal }) {
  useEffect(() => {
    if (mission) {
      launchSchoolPrideConfetti();
    } else {
      launchFireworkConfetti();
    }

    window.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    });
  });

  return (
    <aside className={styles.modal}>
      <div className={styles['modal-content']}>
        <button className={styles['modal-close']} onClick={closeModal}>
          <IconClose />
        </button>
        <p className={styles['icon-award']}>{mission ? '🏅' : '🏆'}</p>
        <p className={styles['modal-heading']}>Congratulations!</p>
        {mission ? (
          <>
            <p>
              You just completed <br />
              {mission.title}!
            </p>
            <Link href="/missions" as="/missions">
              <a className="btn btnprimary">Embark on a new mission!</a>
            </Link>
          </>
        ) : (
          <p>Awesome work!</p>
        )}
        <button
          className={styles['replay-button']}
          onClick={mission ? launchSchoolPrideConfetti : launchFireworkConfetti}
        >
          Replay confetti animation
        </button>
      </div>
    </aside>
  );
}

export default Modal;
