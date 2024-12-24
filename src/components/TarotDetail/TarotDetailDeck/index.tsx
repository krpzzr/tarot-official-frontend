import React, { useState } from 'react';
import { CardLayout } from 'toolkit/actions/cardLayoutActions';
import { useAppSelector } from 'toolkit/hooks';
import { Card } from 'toolkit/reducers/cardsReducer';

import styles from './styles.module.scss';

const table = [
  {
    id: 1,
    rows: 1,
    cells: 4,
    fillOrder: [
      { row: 0, cell: 0 },
      { row: 0, cell: 1 },
      { row: 0, cell: 2 },
      { row: 0, cell: 3 }
    ]
  },
  {
    id: 2,
    rows: 1,
    cells: 3,
    fillOrder: [
      { row: 0, cell: 0 },
      { row: 0, cell: 1 },
      { row: 0, cell: 2 }
    ]
  },
  {
    id: 3,
    rows: 4,
    cells: 4,
    fillOrder: [
      { row: 1, cell: 1 },
      { row: 1, cell: 1 }, // Повторяется
      { row: 1, cell: 0 },
      { row: 0, cell: 1 },
      { row: 2, cell: 2 },
      { row: 3, cell: 3 },
      { row: 2, cell: 3 },
      { row: 1, cell: 3 },
      { row: 0, cell: 3 }
    ]
  },
  {
    id: 4,
    rows: 2,
    cells: 5,
    fillOrder: [
      { row: 0, cell: 0 },
      { row: 1, cell: 0 },
      { row: 1, cell: 1 },
      { row: 1, cell: 2 },
      { row: 1, cell: 3 },
      { row: 1, cell: 4 },
      { row: 0, cell: 4 }
    ]
  },
  {
    id: 5,
    rows: 4,
    cells: 3,
    fillOrder: [
      { row: 0, cell: 1 },
      { row: 1, cell: 0 },
      { row: 1, cell: 2 },
      { row: 2, cell: 0 },
      { row: 2, cell: 2 },
      { row: 3, cell: 1 }
    ]
  },
  {
    id: 6,
    rows: 4,
    cells: 3,
    fillOrder: [
      { row: 1, cell: 1 },
      { row: 1, cell: 1 }, // Повторяется
      { row: 0, cell: 1 },
      { row: 0, cell: 0 },
      { row: 0, cell: 2 },
      { row: 1, cell: 2 },
      { row: 1, cell: 2 },
      { row: 3, cell: 1 }
    ]
  },
  {
    id: 7,
    rows: 4,
    cells: 4,
    fillOrder: [
      { row: 0, cell: 0 },
      { row: 0, cell: 3 },
      { row: 1, cell: 1 },
      { row: 1, cell: 2 },
      { row: 2, cell: 0 },
      { row: 2, cell: 3 },
      { row: 3, cell: 0 },
      { row: 3, cell: 1 },
      { row: 3, cell: 2 }
    ]
  },
  {
    id: 8,
    rows: 4,
    cells: 3,
    fillOrder: [
      { row: 0, cell: 0 },
      { row: 0, cell: 1 },
      { row: 1, cell: 1 },
      { row: 2, cell: 1 },
      { row: 3, cell: 1 },
      { row: 3, cell: 2 },
      { row: 3, cell: 0 },
      { row: 0, cell: 2 }
    ]
  }
];

const TarotDetailDeck: React.FC<{ tarot: CardLayout }> = ({ tarot }) => {
  const { data: cards } = useAppSelector((state: any) => state.cards);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]); // Для хранения массива выбранных карт
  const images = Array(5).fill(`${window.location.origin}/images/back.jpg`);
  const [shuffledIndex, setShuffledIndex] = useState<number | null>(null);

  const handleCardClick = () => {
    if (shuffledIndex !== null || selectedCards.length >= tarot.card_count) return; // Если анимация идет или уже выбрано максимальное количество карт, не выбираем карты

    let availableCards = [...cards];
    const selectedCardIds = selectedCards.map(card => card.id);

    // Фильтруем карты: если карта уже была выбрана, она не будет повторно выбрана
    if (selectedCards.length > 0) {
      availableCards = availableCards.filter(
        (card) => !selectedCardIds.includes(card.id)
      );
    }

    // Если была выбрана карта с "isUpright" = true, исключаем карту с id = uprightId
    if (selectedCards.some(card => card.isUpright)) {
      const uprightCard = selectedCards.find(card => card.isUpright);
      availableCards = availableCards.filter(card => card.id !== uprightCard?.uprightId);
    }

    // Выбираем одну карту случайным образом
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const randomCard = availableCards[randomIndex];

    // Добавляем выбранную карту в массив
    setSelectedCards(prevState => [...prevState, randomCard]);
    setShuffledIndex(0);

    setTimeout(() => {
      setShuffledIndex(null); // Сбрасываем анимацию после окончания
    }, 1000); // Время анимации
  };

  const currentTable = table.find(t => t.id === tarot.layout_type);

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardDetails}>
        {currentTable && (
          <div className={styles.table}>
          {Array.from({ length: currentTable.rows }).map((_, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {Array.from({ length: currentTable.cells }).map((_, cellIndex) => {
                // Находим, есть ли картинка для этой ячейки
                const fillIndices = currentTable.fillOrder
                  .map((fill, index) => ({ ...fill, index }))
                  .filter((fill) => fill.row === rowIndex && fill.cell === cellIndex);

                // Если есть карты для этой ячейки
                if (fillIndices.length > 0) {
                  const cardElements = fillIndices.map(({ index }, fillIndex) => {
                    const card = selectedCards[index];

                    if (card) {
                      return (
                        <img
                          key={fillIndex}
                          src={`${window.location.origin}/images/cards_list/${card.image}`}
                          alt={`card-${rowIndex}-${cellIndex}-${fillIndex}`}
                          style={{
                            transform: fillIndex > 0 ? 'rotate(90deg)' : 'none',
                            position: 'absolute',
                            left: 0,
                            right: 0,
                          }}
                        />
                      );
                    }
                    return null;
                  });

                  return (
                    <div key={cellIndex} className={styles.cell}>
                      {cardElements}
                    </div>
                  );
                }

                return <div key={cellIndex} className={styles.cell} />;
              })}
            </div>
          ))}
        </div>
      )}
      </div>
      {selectedCards.length >= tarot.card_count ? (
        <button>Получить подробный расклад</button>
      ) : (
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
      )}
    </div>
  );
}

export default TarotDetailDeck;
