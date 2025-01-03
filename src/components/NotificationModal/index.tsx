import React from 'react';

import styles from './styles.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRedirect: () => void;
  title: string;
  buttonText: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onRedirect,
  title,
  buttonText,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <div className={styles.actions}>
          <button onClick={onRedirect} className={styles.primaryButton}>
            {buttonText}
          </button>
          <button onClick={onClose} className={styles.secondaryButton}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
