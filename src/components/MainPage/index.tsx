import React, { useEffect } from 'react';

import { useNavigateWithHash } from 'utils/useNavigateWithHash';

import styles from './styles.module.scss';

const MainPage: React.FC = () => {
  const navigate = useNavigateWithHash();

  useEffect(() => {
    document.body.classList.add('disabled-scroll');

    return () => {
      document.body.classList.remove('disabled-scroll');
    };
  }, []);

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <ul className={styles.list}>
          <li onClick={() => handleRedirect('/tarot')}>
            <img src="./images/tarot_cards.png" alt="" />
            <span>Расклады Таро</span>
          </li>
          <li onClick={() => handleRedirect('/magic-ball')}>
            <img src="./images/ball.png" alt="" />
            <span>Предсказания  <br /> Да/Нет</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MainPage;