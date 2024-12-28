import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useCardLayouts } from 'components/TarotList/hooks';
import TarotDetailDeck from './TarotDetailDeck';
import Modal from 'components/NotificationModal';
import { convertHashToQueryParam, getAPIUrl } from 'utils/urlUtils';
import { useAppSelector } from 'toolkit/hooks';

import styles from './styles.module.scss';

const TarotDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<string>('');
  const [isQuestionShow, showQuestion] = useState<boolean>(false);
  const [tarotLayout, showTarotLayout] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { data: user } = useAppSelector((state) => state.user);

  const { data, loading, error } = useCardLayouts();

  const tarot = data.find((item) => item.layout_type === Number(id));

  const formattedText = tarot ? tarot.description_ru.replace(/(\r?\n)/g, '<br />') : '';

  const handleShowQuestion = async () => {
    if (user?.adsDisabledUntil) {
      const adsDisabledDate = new Date(user.adsDisabledUntil);
      const currentDate = new Date();
  
      if (adsDisabledDate > currentDate) {
        // Реклама отключена, сразу показываем вопрос
        showQuestion(true);
        return;
      }
    }

    try {
      const queryParams = convertHashToQueryParam(window.location.search);
      const response = await axios.get(`${getAPIUrl()}/check-subscription?${queryParams}&channelId=@psychology_truth`);
      const isSubscribed = response.data?.isSubscribed;

      if (isSubscribed) {
        showQuestion(true);
      } else {
        setModalOpen(true);
      }
    } catch (error) {
      console.error('Ошибка при проверке подписки:', error);
      setModalOpen(true);
    }
  };

  const handleCreateLayout = (id: number) => {
    showTarotLayout(true);
    showQuestion(false);
  };

  const handleRedirect = () => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.openTelegramLink('https://t.me/psychology_truth');
    } else {
      window.open('https://t.me/psychology_truth', '_blank')
    }
  };

  return (
    <div className={styles.wrapper}>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onRedirect={handleRedirect}
      />
      {tarot && tarotLayout && <TarotDetailDeck tarot={tarot} question={question} />}
      {tarot && isQuestionShow && (
        <div>
          <h1>Задайте свой вопрос</h1>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Введите ваш вопрос"
          />
          <button
            onClick={() => handleCreateLayout(tarot.layout_type)}
            disabled={question.length < 10}
          >
            Сделать расклад за {tarot.price}{' '}
            <img src={`${window.location.origin}/images/balance_icon.png`} alt="" />
          </button>
        </div>
      )}
      {tarot && !isQuestionShow && !tarotLayout && (
        <div>
          <h1>{tarot.title_ru}</h1>
          <div className={styles.description}>
            <div dangerouslySetInnerHTML={{ __html: formattedText }} />
          </div>
          <button onClick={handleShowQuestion}>Далее</button>
        </div>
      )}
    </div>
  );
};

export default TarotDetail;
