import React, { useState } from 'react';

import { useNavigateWithHash } from 'utils/useNavigateWithHash';
import { useCardLayouts } from './hooks';

import styles from './styles.module.scss';

const TarotList = () => {
  const navigate = useNavigateWithHash();
  const { data, loading, error } = useCardLayouts();

  const handleClick = (id: number) => {
    navigate(`/tarot/${id}`);
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className={styles.wrapper}>
      <h1>Расклады Таро</h1>
      <div>
        <ul className={styles.list}>
          {data.map(({ id, title_ru, layout_type }) => (
            <li
              key={id}
              onClick={() => handleClick(layout_type)}
              className={[1,2,8].includes(layout_type) ? styles.forBeginners : ''}
            >
              {title_ru}
              {[1,2,8].includes(layout_type) && <span>Для новичков</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TarotList;