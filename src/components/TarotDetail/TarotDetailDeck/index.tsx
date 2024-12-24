import React, { useState } from 'react';
import { CardLayout } from 'toolkit/actions/cardLayoutActions';

import styles from './styles.module.scss';

const TarotDeck: React.FC = () => {
  return (
    <div>1</div>
  );
}

const TarotDetailDeck: React.FC<{tarot: CardLayout}> = ({ tarot }) => {
  const images = Array(5).fill(`${window.location.origin}/images/back.jpg`);
  const [shuffledIndex, setShuffledIndex] = useState<number | null>(null);

  const handleCardClick = () => {
    if  (shuffledIndex || shuffledIndex === 0) return;

    setShuffledIndex(0);
    setTimeout(() => {
      setShuffledIndex(null); // Сбрасываем анимацию после окончания
    }, 1000); // Время анимации
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.deckIcon} onClick={handleCardClick}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`card-${index}`}
            className={shuffledIndex === index ? styles.shuffling : ''}
            style={{
              position: 'absolute',
              top: `${index * 3}px`,
              left: `${index * 3}px`,
              width: '50px',
              height: 'auto',
              zIndex: 5 - index,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default TarotDetailDeck;
