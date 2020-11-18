import { useEffect } from 'react';
import { launchFireworkConfetti } from '../util/confetti';
import styles from './ModalCertLoading.module.css';
import IconClose from './IconClose';

function Modal({ mission, closeModal }) {
  useEffect(() => {
    launchFireworkConfetti();

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
        <p className={styles['icon-award']}>🏆</p>
        <p className={styles['modal-heading']}>
          Your certificate will be here soon!
        </p>
        <p>
          We are currently generating a PDF to recognize your hard work and
          accomplishment! <br /> While you are waiting, enjoy this dancing taco!
        </p>
        <img
          src="https://res.cloudinary.com/netlify/image/upload/q_auto,f_auto,w_200/v1605682813/explorers/dancing-taco.gif"
          alt="a taco dancing happily"
        />
        <button
          className={styles['replay-button']}
          onClick={launchFireworkConfetti}
        >
          Replay confetti animation
        </button>
      </div>
    </aside>
  );
}

export default Modal;
