import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from 'components/Header';
import MainPage from 'components/MainPage';
import TarotList from 'components/TarotList';
import YesNoGame from 'components/MysteryBall';
import BonusBalance from 'components/Modal/ui/BonusBalance';
import Modal from 'components/Modal';
import Payments from 'components/Payments';
import TarotDetail from 'components/TarotDetail';
import LayoutHistoryDetail from 'components/LayoutHistoryDetail';
import LayoutHistoryList from 'components/LayoutHistoryList';
import Chat from 'components/Chat';
import { useAppDispatch } from 'toolkit/hooks';
import { convertHashToQueryParam } from 'utils/urlUtils';
import { useNavigateWithHash } from 'utils/useNavigateWithHash';
import { fetchUserData } from 'toolkit/actions/userActions';
import { fetchCards } from 'toolkit/actions/cardActions';
import { fetchCardLayouts } from 'toolkit/actions/cardLayoutActions';
import Friends from 'components/Friends';

import styles from './styles.module.scss';

interface EventData {
  eventType: string;
  payload: any;
}

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigateWithHash();

  useEffect(() => {
    // Скроллим страницу вверх при изменении маршрута
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [location]);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();

      try {
        // @ts-ignore
        window.Telegram.WebApp.requestFullscreen();
        window.Telegram.WebApp.disableVerticalSwipes();
        window.Telegram.WebApp.backgroundColor = '#351465';
        window.Telegram.WebApp.headerColor = '#351465';
        window.Telegram.WebApp.bottomBarColor = '#351465';
        window.Telegram.WebApp.isClosingConfirmationEnabled = true;
      } catch (error: any) {
        if (error.message === 'WebAppMethodUnsupported') {
            console.warn('Fullscreen mode is not supported on this device.');
        } else {
            console.error('An unexpected error occurred:', error);
        }
      }
      // @ts-ignore
      window.Telegram.WebApp.lockOrientation();
      console.log('Telegram mini app is ready!');
    } else {
      console.error('Telegram WebApp API is not available.');
    }

    if ((!window as any).TelegramGameProxy) {
      (window as any).TelegramGameProxy = {
        receiveEvent: (data: EventData) => console.log("Mock event received:", data),
      };
    }

    try {
      (window as any).TelegramGameProxy.receiveEvent({ type: "test_event" });
    } catch (error) {
      console.error("Error calling TelegramGameProxy:", error);
    }
  }, []);

  useEffect(() => {
    const queryParam = convertHashToQueryParam(window.location.search);

    localStorage.setItem('tg_query_param', queryParam);

    dispatch(fetchUserData());
    dispatch(fetchCards());
    dispatch(fetchCardLayouts());
  }, []);

  useEffect(() => {
    // Устанавливаем кнопку "Назад" в зависимости от пути
    if (window.Telegram?.WebApp?.BackButton) {
      if (location.pathname !== '/') {
        // Показываем кнопку "Назад", если не на главной странице
        window.Telegram.WebApp.BackButton.show();

        // Добавляем обработчик для возврата назад
        const handleBackClick = () => navigate(-1); // Переход на предыдущую страницу
        window.Telegram.WebApp.BackButton.onClick(handleBackClick);

        // Удаляем обработчик при размонтировании
        return () => {
          window.Telegram.WebApp.BackButton.offClick(handleBackClick);
        };
      } else {
        // Скрываем кнопку "Назад" на главной странице
        window.Telegram.WebApp.BackButton.hide();
      }
    }
  }, [location.pathname, navigate]);
  return (
    <div className={styles.wrapper}>
      <Header />
       <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/tarot" element={<TarotList />} />
        <Route path="/tarot/:id" element={<TarotDetail />} />
        <Route path="/card-layout-history/" element={<LayoutHistoryList />} />
        <Route path="/card-layout-history/:id" element={<LayoutHistoryDetail />} />
        <Route path="/magic-ball" element={<YesNoGame />} />
        <Route path="/rewards" element={<div>Rewards</div>} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
      <Modal>
        <BonusBalance />
      </Modal>
    </div>
  );
};

export default App;
