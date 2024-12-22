import React from 'react';

import { useAppDispatch } from 'toolkit/hooks';
import { useNavigateWithHash } from 'utils/useNavigateWithHash';
import { createInvoice } from 'toolkit/actions/paymentActions';

import styles from './styles.module.scss';

const balancePayment = [
  {
    amount: 100,
    price: 1,
    text: '9900%',
  },
  {
    amount: 50,
    price: 50,
    text: '',
  },
  {
    amount: 140,
    price: 100,
    text: '40%',
  },
  {
    amount: 1000,
    price: 500,
    text: '100%',
  },
  {
    amount: 3000,
    price: 1000,
    text: '200%',
  },
];

const Payments: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigateWithHash();

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  const handleCreateTransaction = (type: string, amount: number, price: number) => {
    dispatch(createInvoice({ type, amount, price }))
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <h2>Пополнение баланса</h2>
        <ul className={styles.donateList}>
          {balancePayment.map(({ amount, price, text }, index) => (
            <li
              className={price === 500 ? styles.popular : ''}
              key={index}
              onClick={() => handleCreateTransaction('balance', amount, price)}
            >
              <div className={styles.balanceAmount}>
                {amount} <img src="./images/balance_icon.png" alt="" />
              </div>
              <div className={styles.balancePrice}>
                {price} <img src="./images/tg_stars.png" alt="" />
              </div>
              {text && (
                <div className={styles.balanceDiscount}>
                  <span>
                    {text}
                  </span>
                </div>
              )}
              {price === 500 && <span className={styles.popularText}>Популярно</span>}
            </li>
          ))}
        </ul>
      </div>
      <h2>Дополнительные возможности</h2>
      <ul className={styles.donateListExtra}>
        <li onClick={() => handleCreateTransaction('doubleDayReward', 200, 200)}>
          <p>Удвоить ежедневную награду</p>
          <div>200 <img src="./images/tg_stars.png" alt="" /></div>
        </li>
        <li onClick={() => handleCreateTransaction('ad', 150, 150)}>
          <p>Отключить рекламу на 30 дней</p>
          <div>150 <img src="./images/tg_stars.png" alt="" /></div>
        </li>
      </ul>
    </div>
  );
}

export default Payments;