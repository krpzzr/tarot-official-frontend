import React from 'react';

import { useCardLayoutsHistory } from './hooks';
import { useNavigateWithHash } from 'utils/useNavigateWithHash';

import styles from './styles.module.scss';

const LayoutHistoryList: React.FC = () => {
  const navigate = useNavigateWithHash();

  const { data: list } = useCardLayoutsHistory();

  const handleRedirect = (path: string) => {
    navigate(path);
  };


  return (
    <div className={styles.wrapper}>
      <h1>История раскладов</h1>
      <div>
        <ul className={styles.list}>
          {list.map(item => (
            <li key={item.id} onClick={() => handleRedirect(`/card-layout-history/${item.id}`)}>
              <div>{item.question}</div>
              <div>
                <button>Открыть</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LayoutHistoryList;
