import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useCardLayouts } from 'components/TarotList/hooks';
import TarotDetailDeck from './TarotDetailDeck';

import styles from './styles.module.scss';

const TarotDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<string>('');
  const [isQuestionShow, showQuestion] = useState<boolean>(false);
  const [tarotLayout, showTarotLayout] = useState<boolean>(false);

  const { data, loading, error } = useCardLayouts();

  const tarot = data.find((item) => item.layout_type === Number(id));

  const formattedText = tarot ? tarot.description_ru.replace(/(\r?\n)/g, '<br />') : '';

  const handleShowQuestion = () => {
    showQuestion(true);
  }

  const handleCreateLayout = (id: number) => {
    showTarotLayout(true);
    showQuestion(false);
  }

  return (
    <div className={styles.wrapper}>
      {tarot && tarotLayout && <TarotDetailDeck tarot={tarot} />}
      {tarot && isQuestionShow && (
        <div>
          <h1>Задайте свой вопрос</h1>
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder='Введите ваш вопрос'
          />
          <button
            onClick={() => handleCreateLayout(tarot.layout_type)}
            disabled={question.length < 5}
          >
            Сделать расклад за {tarot.price} <img src={`${window.location.origin}/images/balance_icon.png`} alt="" />
          </button>
        </div>
      )}
      {tarot && !isQuestionShow && !tarotLayout && (
      <div>
        <h1>{tarot.title_ru}</h1>
        <div className={styles.description}>
          <div dangerouslySetInnerHTML={{ __html: formattedText }} />
        </div>
        <button
          onClick={() => handleShowQuestion()}
        >
          Далее
        </button>
      </div>
      )}
    </div>
  );
}

export default TarotDetail;