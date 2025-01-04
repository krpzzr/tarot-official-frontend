import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useAppDispatch, useAppSelector } from 'toolkit/hooks';

import { Card } from 'toolkit/reducers/cardsReducer';
import { convertHashToQueryParam, getAPIUrl } from 'utils/urlUtils';
import { fetchUserData } from 'toolkit/actions/userActions';

import styles from './styles.module.scss';

const CardOfDay: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [card, setCard] = useState<Card | null>(null);
  const [imgUrl, setImgUrl] = useState<string>('/images/back.jpg');
  const { data: cards } = useAppSelector((state) => state.cards);
  const { data: user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentCard = cards.find(card => card.id === user.dayCard);
    if (currentCard) {
      setCard(currentCard);
      setImgUrl(`/images/cards_list/${currentCard.image}`);
    }
  }, [cards, user]);

  const handleCardClick = async () => {
    if ((user && user.dayCard) || card || !user) return;

    if (!isFlipped) {
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      setCard(randomCard);
      const queryParams = convertHashToQueryParam(window.location.search);
      await axios.post(`${getAPIUrl()}/card-day?${queryParams}`, {
        cardId: randomCard.id,
      });
      dispatch(fetchUserData());
      setTimeout(() => {
        setImgUrl(`/images/cards_list/${randomCard.image}`);
      }, 200);
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Карта дня</h1>
      <div className={styles.cardWrapper}>
        <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`} onClick={handleCardClick}>
          <img src={`${window.location.origin}${imgUrl}`} alt="Card Back" />
        </div>
      </div>
      {card && (
        <div className={styles.cardDescription}>
          <h3>{card.nameRu}&nbsp;{card.isUpright ? '' : '(перевернутая)'}</h3>
          <p>{card.descriptionRu}</p>
        </div>
      )}
    </div>
  );
};

export default CardOfDay;