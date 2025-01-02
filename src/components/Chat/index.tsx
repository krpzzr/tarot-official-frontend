import React, { useEffect, useRef } from 'react';
import SendIcon from '@mui/icons-material/Send';

import styles from './styles.module.scss';

const Chat: React.FC = () => {
  const chatWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatWrapperRef.current) {
      chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
    }
    document.body.classList.add('disabled-scroll');
  
    return () => {
      document.body.classList.remove('disabled-scroll');
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chatWrapper} ref={chatWrapperRef}>
        <ul className={styles.messagesList}>
          {Array.from({ length: 100 }).map((_, i) => (
            <li key={i}>
              <div>Сообщение СообщениеСообщениеСообщение Сообщен{i + 1}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.textAreaWrapper}>
        <textarea name="" placeholder="Введите ваш вопрос" id=""></textarea>
        <button>
          <SendIcon />
        </button>
      </div>
      <div className={styles.priceWrapper}>
        Стоимость 1 вопроса - 25 <img src="./images/balance_icon.png" alt="" />
      </div>
    </div>
  );
};

export default Chat;
