import { useEffect } from 'react';
import {
  launchFireworkConfetti,
  launchSchoolPrideConfetti,
} from '../util/confetti';
import styles from './Modal.module.css';
import IconClose from './IconClose';
import Link from 'next/link';

function Modal() {
  useEffect(() => {
    launchSchoolPrideConfetti();
  });

  return (
    <aside className={styles.modal}>
      <div className={styles['modal-content']}>
        <button className={styles['modal-close']}>
          <IconClose />
        </button>
        <p className={styles['icon-award']}>🏅</p>
        <p className={styles['modal-heading']}>Congratulations!</p>
        <p>You just completed Mission Name!</p>
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
