import { useEffect } from 'react';
import { launchSchoolPrideConfetti } from '../util/confetti';
import styles from './ModalCongrats.module.css';
import IconClose from './IconClose';
import Link from 'next/link';

function Modal({ mission, closeModal }) {
  useEffect(() => {
    launchSchoolPrideConfetti();

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
        <p className={styles['icon-award']}>🏅</p>
        <p className={styles['modal-heading']}>Congratulations!</p>
        <p>
          You just completed <br />
          {mission.title}!
        </p>
        <Link href="/missions" as="/missions">
          <a className="btn btnprimary">Embark on a new mission!</a>
        </Link>
        <button
          className={styles['replay-button']}
          onClick={launchSchoolPrideConfetti}
        >
          Replay confetti animation
        </button>
      </div>
    </aside>
  );
}

export default Modal;
