import React, { useRef, useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import CloseIcon from '@mui/icons-material/Close';

import { useAppSelector, useAppDispatch } from 'toolkit/hooks';
import { closeModal } from 'toolkit/reducers/modalReducer';

import styles from './styles.module.scss';

interface IProps {
  isCloseOnOverlayClick?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<IProps> = ({ isCloseOnOverlayClick, children }) => {
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const dispatch = useAppDispatch();

  const handleOverlayClick = () => {
    if (isCloseOnOverlayClick) {
      dispatch(closeModal());
    }
  }

  return (
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`${styles.modalContent} ${styles.openAnimation}`}
        onClick={(e) => e.stopPropagation()}
      >
        <>
          {isCloseOnOverlayClick && (
            <div
              onClick={handleOverlayClick}
              className={styles.closeIcon}
            >
              <CloseIcon />
            </div>
          )}
          {children}
        </>
      </div>
    </div>
  );
};

export default Modal;
