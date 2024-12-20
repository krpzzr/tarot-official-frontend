import React, { useState } from 'react';

import styles from './styles.module.scss';

const TarotList = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Расклады Таро</h1>
      <div>
        <ul className={styles.list}>
          <li>
            Краткий прогноз (4 карты)
          </li>
          <li>
            Общий прогноз (3 карты)
          </li>
          <li>
            Кельтский крест (10 карт)
          </li>
          <li>
            Подкова (7 карт)
          </li>
          <li>
            Алхимик (6 карт)
          </li>
          <li>
            Тайна верховной жрицы (9 карт)
          </li>
          <li>
            Выбор оптимального решения (9 карт)
          </li>
          <li>
            Судьба и будущее (8 карт)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TarotList;