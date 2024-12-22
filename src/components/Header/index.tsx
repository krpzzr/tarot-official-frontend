import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigateWithHash } from 'utils/useNavigateWithHash';
import { useAppSelector } from 'toolkit/hooks';

import styles from './styles.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigateWithHash();
  const location = useLocation();
  const { data: user, loading, error } = useAppSelector((state) => state.user);

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.wrapper}>
      {user && (
        <div className={styles.balance}>
          <span>{user.balance}<img src="./images/balance_icon.png" alt="" /></span>
        </div>
      )}
      <div>
        {location.pathname !== '/payments' && (
          <button onClick={() => handleRedirect('payments')}>Пополнить Баланс</button>
        )}
      </div>
    </div>
  )
}

export default Header;