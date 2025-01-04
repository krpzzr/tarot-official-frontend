import React, { useState, CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';

import { useAppDispatch, useAppSelector } from 'toolkit/hooks';
import { useCardLayoutsHistory } from 'components/LayoutHistoryList/hooks';
import Modal from 'components/NotificationModal';
import { convertHashToQueryParam, getAPIUrl } from 'utils/urlUtils';
import { formatText } from 'utils/formattint';
import { categories } from 'data';
import { useNavigateWithHash } from 'utils/useNavigateWithHash';
import { setBalance } from 'toolkit/reducers/userReducer';

import styles from './styles.module.scss';

const LayoutHistoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentTab, setCurrentTab] = useState(0);
  const [aiAnswer, setAiAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalBalanceOpen, setModalBalanceOpen] = useState(false);
  const [isModalAiAnswerOpen, setModalAiAnswerOpen] = useState(false);
  const navigate = useNavigateWithHash();
  const dispatch = useAppDispatch();

  const { data: list } = useCardLayoutsHistory();
  const { data: cards } = useAppSelector((state) => state.cards);
  const { data: user } = useAppSelector((state) => state.user);

  const layout = list.find((item) => item.id === Number(id));

  if (!layout) return <div></div>;

  // Находим категории для текущего типа расклада
  const layoutCategories = categories.find((cat) => cat.id === layout.cardLayout.layout_type);

  const handleGetAiAnswer = async () => {
    if (user.balance < 50) {
      setModalBalanceOpen(true);
      return;
    }

    if (isLoading) return;
    if (layoutCategories && layout) {
      const categoryStrings: string[] = [];
  
      layoutCategories.categories.forEach((category, index) => {
        let cardIdsToDisplay: number[] = [];
  
        if (layout.cardLayout.layout_type === 7 && category.name === 'Результат претворения решения в жизнь') {
          // Для категории "Результат претворения решения в жизнь" отображаем последние 2 карты
          cardIdsToDisplay = layout.cards.slice(-3);
        } else if (layout.cardLayout.layout_type === 8) {
          if (category.name === 'Текущая ситуация') {
            // Для "Текущей ситуации" отображаем первые 2 карты
            cardIdsToDisplay = layout.cards.slice(0, 2);
          } else if (category.name === 'Ближайшее будущее') {
            // Для "Ближайшего будущего" отображаем следующие 3 карты
            cardIdsToDisplay = layout.cards.slice(2, 5);
          } else {
            // Для остальных категорий распределяем оставшиеся карты
            const alreadyDisplayed = 5; // Учитываем, что первые 5 карт уже использованы
            const currentCategoryIndex = layoutCategories.categories.indexOf(category);
            cardIdsToDisplay = layout.cards.slice(alreadyDisplayed + currentCategoryIndex - 2, alreadyDisplayed + currentCategoryIndex - 1);
          }
        } else {
          // Для остальных категорий отображаем карту по индексу
          cardIdsToDisplay = layout.cards.slice(index, index + 1);
        }
  
        // Находим карты и собираем их названия
        const cardNames = cardIdsToDisplay
          .map((cardId) => {
            const card = cards.find((c) => c.id === Number(cardId));
            return card ? `${card.nameRu} ${card.isUpright ? '(прямая карта)' : '(перевернутая карта)'}` : null;
          })
          .filter((name): name is string => name !== null); // Исключаем null
  
        // Добавляем строку для текущей категории в массив
        categoryStrings.push(`-${category.name} - ${cardNames.join(', ')}`);
      });
      
      try {
        setIsLoading(true);
        const queryParams = convertHashToQueryParam(window.location.search);
        const response = await axios.post(`${getAPIUrl()}/detailed-layout?${queryParams}`, {
          cardLayoutHistoryId: layout.id,
          cards: categoryStrings.join('.\n'),
        });
        const answer = response.data?.answer;

        dispatch(setBalance(user.balance - 50));
        setCurrentTab(1);
        setAiAnswer(answer);
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Ошибка при получении подробного расклада:', error);
      }
    }
  };

  
  const handleRedirectBalance = () => {
    navigate('/payments');
  };

  return (
    <div className={styles.wrapper}>
      <h1>{layout.question}</h1>
      <ul className={styles.tabs}>
        <li
          className={currentTab === 0 ? styles.active : ''}
          onClick={() => setCurrentTab(0)}
        >
          Базовый
        </li>
        <li
          className={currentTab === 1 ? styles.active : ''}
          onClick={() => {
            if (layout.aiAnswer || aiAnswer) {
              setCurrentTab(1)
            }
          }}
        >
          Подробный
        </li>
      </ul>
      {currentTab === 1 && (layout.aiAnswer || aiAnswer) && (
        <div
          style={{
            borderRadius: 40,
            background: '#fff',
            color: '#000',
            padding: 20
          }}
          dangerouslySetInnerHTML={{
            __html: formatText(aiAnswer || layout.aiAnswer || '')
          }}
        />
      )}
      {layoutCategories && currentTab === 0 && (
        <ul className={styles.list}>
          {layoutCategories.categories.map((category, index) => {
            let cardIdsToDisplay: number[] = [];

            if (layout.cardLayout.layout_type === 7 && category.name === 'Результат претворения решения в жизнь') {
              // Для категории "Результат претворения решения в жизнь" отображаем последние 2 карты
              cardIdsToDisplay = layout.cards.slice(-3);
            } else if (layout.cardLayout.layout_type === 8) {
              if (category.name === 'Текущая ситуация') {
                // Для "Текущей ситуации" отображаем первые 2 карты
                cardIdsToDisplay = layout.cards.slice(0, 2);
              } else if (category.name === 'Ближайшее будущее') {
                // Для "Ближайшего будущего" отображаем следующие 3 карты
                cardIdsToDisplay = layout.cards.slice(2, 5);
              } else {
                // Для остальных категорий распределяем оставшиеся карты
                const alreadyDisplayed = 5; // Учитываем, что первые 5 карт уже использованы
                const currentCategoryIndex = layoutCategories.categories.indexOf(category);
                cardIdsToDisplay = layout.cards.slice(alreadyDisplayed + currentCategoryIndex - 2, alreadyDisplayed + currentCategoryIndex - 1);
              }
            } else {
              // Для остальных категорий отображаем карту по индексу
              cardIdsToDisplay = layout.cards.slice(index, index + 1);
            }

            return (
              <li key={index}>
                <h2>{category.name}</h2>
                {category.description && <p
                  style={{
                    fontStyle: 'italic',
                    textAlign: 'center',
                    marginBottom: 20,
                  }}
                >{category.description}</p>}
                <div style={{ marginBottom: 40 }}>
                  {cardIdsToDisplay.map((cardId) => {
                    const card = cards.find((c) => c.id === Number(cardId));
                    return card ? (
                      <div key={cardId}>
                        <img src={`${window.location.origin}/images/cards_list/${card.image}`} alt={card.nameRu} />
                        <h3>{card.nameRu}&nbsp;{!card.isUpright ? '(перевернутая)' : ''}</h3>
                        <p>{card.descriptionRu}</p>
                      </div>
                    ) : null;
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {!layout.aiAnswer && !aiAnswer && (
        <button
          className={`${styles.aiButton} ${isLoading ? styles.loadingButton : ''}`}
          onClick={handleGetAiAnswer}
        >
          {isLoading ? 'Формируем подробное толкование' : 'Получить подробное толкование расклада'}
          {isLoading ? (
            <div
              style={{
                height: 10,
                marginTop: 7,
                marginBottom: 8
              }}
            >
              <BeatLoader
                loading={isLoading}
                size={11}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <div className={styles.detailPrice}>
              50 <img src={`${window.location.origin}/images/balance_icon.png`} alt="" />
            </div>
          )}
        </button>
      )}


      <Modal
        isOpen={isModalBalanceOpen}
        onClose={() => setModalBalanceOpen(false)}
        onRedirect={handleRedirectBalance}
        title="У вас недостаточно средств на балансе"
        buttonText="Пополнить баланс"
      />
    </div>
  );
}

export default LayoutHistoryDetail; 