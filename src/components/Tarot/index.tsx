import React, { useState } from "react";

const tarotDeck = [
  "Сила", "Колесо фортуны", "Солнце", "Император", "Отшельник",
  "Дурак", "Смерть", "Башня", "Влюбленные", "Маг"
];

const TarotCard = () => {
  const [card, setCard] = useState<string>('');

  const drawCard = () => {
    const randomCard: string = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
    setCard(randomCard);
  };

  return (
    <div>
      <h2>Гадание на Таро</h2>
      {card ? (
        <div>
          <h3>Ваша карта: {card}</h3>
          <button onClick={() => setCard('')}>Сбросить</button>
        </div>
      ) : (
        <button onClick={drawCard}>Вытянуть карту</button>
      )}
    </div>
  );
};

export default TarotCard;