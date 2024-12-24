import React from 'react';
import { useParams } from 'react-router-dom';

import { useCardLayouts } from 'components/TarotList/hooks';

import styles from './styles.module.scss';

const TarotDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useCardLayouts();

  const tarot = data.find((item) => item.layout_type === Number(id));

  return (
    <div>
      {tarot && (
        <div>
          <p>ID расклада: {id}</p>
          <p>Название: {tarot.title_ru}</p>
          <div className={styles.description}>Описание: {tarot.description_ru}</div>

          <button>Сделать расклад {tarot.price}</button>
        </div>
      )}
    </div>
  );
}

export default TarotDetail;