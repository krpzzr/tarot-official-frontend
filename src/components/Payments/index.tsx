import React from 'react';
import { useNavigate } from 'react-router-dom';

import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

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
  const navigate = useNavigate();

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <ul className={styles.donateList}>
          {balancePayment.map(({ amount, price, text }) => (
            <li className={price === 500 ? styles.popular : ''}>
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
    </div>
  );
}

export default Payments;