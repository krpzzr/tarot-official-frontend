import React from 'react';

import styles from './styles.module.scss';

const Header: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.balance}>
        500 <img src="./images/balance_icon.png" alt="" />
      </div>
      <div>
        <button>Пополнить Баланс</button>
      </div>
    </div>
  )
}

export default Header;