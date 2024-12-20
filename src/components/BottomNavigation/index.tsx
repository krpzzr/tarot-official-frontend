import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './styles.module.scss';

const BottomNavigation: React.FC = () => {
  useEffect(() => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
  }, []);

  return (
    <nav className={styles.wrapper}>
      <ul>
        <li>
          <NavLink 
            to="/tarot" 
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            <img src="./images/tarot_cards.png" alt="Tarot Cards" />
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/magic-ball" 
            className={({ isActive }) => `${styles.ball} ${isActive ? styles.active : ''}`}
          >
            <img src="./images/ball.png" alt="Magic Ball" />
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/rewards" 
            className={({ isActive }) => `${styles.reward} ${isActive ? styles.active : ''}`}
          >
            <img src="./images/rewards.png" alt="Rewards" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNavigation;