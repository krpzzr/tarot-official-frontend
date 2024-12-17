import React, { useState } from "react";

const YesNoGame = () => {
  const [answer, setAnswer] = useState<string>('');

  const getAnswer = () => {
    const randomAnswer = Math.random() > 0.5 ? "Да" : "Нет";
    setAnswer(randomAnswer);
  };

  return (
    <div>
      <h2>Игра "Да/Нет"</h2>
      {answer ? (
        <div>
          <h3>Ответ: {answer}</h3>
          <button onClick={() => setAnswer('null')}>Задать новый вопрос</button>
        </div>
      ) : (
        <button onClick={getAnswer}>Получить ответ</button>
      )}
    </div>
  );
};

export default YesNoGame;