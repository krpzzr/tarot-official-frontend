import React from 'react';

import { useAppDispatch, useAppSelector } from 'toolkit/hooks';
import { fetchUserBonus } from 'toolkit/actions/userActions';
import { convertHashToQueryParam } from 'utils/urlUtils';

import styles from './styles.module.scss'

const bonuses = [
  {
    title: '1 день',
    reward: 1,
  },
  {
    title: '2 день',
    reward: 2,
  },
  {
    title: '3 день',
    reward: 3,
  },
  {
    title: '4 день',
    reward: 4,
  },
  {
    title: '5 день',
    reward: 5,
  },
  {
    title: '6 день',
    reward: 6,
  },
  {
    title: '7 день',
    reward: 29,
  }
];
const BonusBalance: React.FC = () => {
  const { data: user, loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  
  const handleClick = () => {
    dispatch(fetchUserBonus());
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <h1>Ежедневный бонус</h1>
        <ul className={styles.list}>
          {user && bonuses.map(bonus => (
            <li key={bonus.reward} className={(user.doubleDayReward ? user.bonusBalance >= bonus.reward * 2 : user.bonusBalance >= bonus.reward) ? styles.active : ''}>
              <div>{bonus.title}</div>
              <div className={styles.reward}>
                <div>{user.doubleDayReward ? bonus.reward * 2 : bonus.reward}</div>
                <img src={`${window.location.origin}/images/balance_icon.png`} alt="" />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={handleClick}>Забрать бонус</button>
      </div>
    </div>
  );
}

export default BonusBalance;