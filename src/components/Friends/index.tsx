import React, { useState } from 'react';

import { useAppSelector } from 'toolkit/hooks';

import styles from './styles.module.scss';

const Friends: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const { data: user, loading, error } = useAppSelector((state) => state.user);

  const referralLink = `https://t.me/tarot_official_bot/tarot?startapp=${user ? user.referralCode : ''}`;

  const handleShareClick = () => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=\n\nКогда перед тобой сложный выбор, карты могут стать проводником к верному решению.\n\n Присоединяйся и открой для себя мир древней мудрости и ценных таро-консультаций!`, '_blank');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);

      if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
      }

      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy referral link:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>
        Получайте по <span>20 <img src={`${window.location.origin}/images/balance_icon.png`} alt="" /></span>
        <br /> 
        за каждого приглашенного пользователя
      </h1>
      <div className={styles.referralLinkWrapper}>
        <input type="text" disabled value={referralLink} />
      </div>
      <div className={styles.buttonsWrapper}>
        <button onClick={handleCopy}>{copied ? 'Ссылка скопирована' : 'Скопировать ссылку'}</button>
        <button onClick={handleShareClick}>Пригласить друзей</button>
      </div>
    </div>
  );
}

export default Friends;