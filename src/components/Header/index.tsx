import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './styles.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.balance}>
        <span>500<img src="./images/balance_icon.png" alt="" /></span>
      </div>
      <div>
        {location.pathname !== '/payments' && (
          <button onClick={() => handleRedirect('payments')}>Пополнить Баланс</button>
        )}
      </div>
    </div>
  )
}

export default Header;