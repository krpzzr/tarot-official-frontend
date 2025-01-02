import React, { useEffect, useRef, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import SendIcon from '@mui/icons-material/Send';

import { fetchChatHistory, sendQuestionToAI } from 'toolkit/actions/chatHistoryActions';
import { useAppDispatch, useAppSelector } from 'toolkit/hooks';
import { formatText } from 'utils/formattint';

import styles from './styles.module.scss';

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const chatWrapperRef = useRef<HTMLDivElement | null>(null);

  // Локальное состояние для текстового поля
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // Получаем данные из сторы
  const { history, isLoading } = useAppSelector((state) => state.chat);
  const { data: user, loading, error } = useAppSelector((state) => state.user);

  // Автоскролл при изменении истории
  useEffect(() => {
    if (chatWrapperRef.current) {
      chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
    }
  }, [history]);

  // Отключение скроллинга страницы
  useEffect(() => {
    dispatch(fetchChatHistory());

    document.body.classList.add('disabled-scroll');

    return () => {
      document.body.classList.remove('disabled-scroll');
    };
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsSending(true);

    try {
      await dispatch(sendQuestionToAI(message));
      setMessage(''); // Очистить поле ввода после успешного отправления
    } catch (error) {
      console.error('Error sending question:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleFocus = () => setIsKeyboardOpen(true);
  const handleBlur = () => setIsKeyboardOpen(false);

  if (!user) return null;

  return (
    <div className={styles.wrapper} style={{
      height: isKeyboardOpen ? 'calc(100vh - 500px)' : 'calc(100vh - 190px)'
    }}>
      <div className={styles.chatWrapper} ref={chatWrapperRef}>
        <ul className={styles.messagesList}>
          {history.map((chat, index) => (
            <React.Fragment key={index}>
              <li>
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatText(chat.answer)
                  }}
                />
              </li>
              <li>
                <div>
                  {chat.question}
                </div>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
      <div className={styles.textAreaWrapper}>
        <textarea
          placeholder="Введите ваш вопрос"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSending}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button onClick={handleSendMessage} disabled={isSending || isLoading || user.balance < 25}>
          {isSending ? (
            <BeatLoader
              loading={true}
              size={11}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : <SendIcon />}
        </button>
      </div>
      <div className={styles.priceWrapper}>
        Стоимость 1 вопроса - 25 <img src="./images/balance_icon.png" alt="Баланс" />
      </div>
    </div>
  );
};

export default Chat;
