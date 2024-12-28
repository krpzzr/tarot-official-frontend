import React from 'react';

import styles from './styles.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRedirect: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onRedirect }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Для продолжения необходимо подписаться на Telegram-канал</h2>
        <div className={styles.actions}>
          <button onClick={onRedirect} className={styles.primaryButton}>
            Перейти в Telegram
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
