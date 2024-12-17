import React from 'react';

import styles from './styles.module.scss';

interface IProps {
  setCurrentView: (screen: string) => void;
  screen: string;
}

const BottomNavigation: React.FC<IProps> = ({ setCurrentView, screen }) => {
  return (
    <nav className={styles.wrapper}>
      <ul>
        <li
          className={`${screen === 'tarot' ? styles.active : ''}`}
          onClick={() => setCurrentView('tarot')}
          >
          <img src="./images/tarot_cards.png" alt="" />
        </li>
        <li
          className={`${styles.ball} ${screen === 'magic-ball' ? styles.active : ''}`}
          onClick={() => setCurrentView('magic-ball')}
        >
          <img src="./images/ball.png" alt="" />
        </li>
        <li
          className={`${styles.reward} ${screen === 'rewards' ? styles.active : ''}`}
          onClick={() => setCurrentView('rewards')}
        >
          <img src="./images/rewards.png" alt="" />
        </li>
      </ul>   
    </nav>
  )
}

export default BottomNavigation;