import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Header from 'components/Header';
import MainPage from 'components/MainPage';
import TarotList from 'components/TarotList';
import YesNoGame from 'components/MysteryBall';
import BonusBalance from 'components/Modal/ui/BonusBalance';
import Modal from 'components/Modal';
import Payments from 'components/Payments';
import { useAppDispatch, useAppSelector } from 'toolkit/hooks';
import { convertHashToQueryParam } from 'utils/urlUtils';
import { fetchUserData } from 'toolkit/actions/userActions';

import styles from './styles.module.scss';

interface EventData {
  eventType: string;
  payload: any;
}

// const formatText = (text: string) => {
//   // Заменяем \n на <br /> для переноса строк
//   let formattedText = text.replace(/\n/g, '<br />');
  
//   // Заменяем **текст** на <strong>текст</strong> для жирного текста
//   formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

//   return formattedText;
// };

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();

      try {
        // @ts-ignore
        window.Telegram.WebApp.requestFullscreen();
        window.Telegram.WebApp.disableVerticalSwipes();
        window.Telegram.WebApp.backgroundColor = '#000000';
        window.Telegram.WebApp.headerColor = '#000000';
        window.Telegram.WebApp.bottomBarColor = '#000000';
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

    dispatch(fetchUserData(convertHashToQueryParam(window.location.search)));
  }, []);

  useEffect(() => {
    // Устанавливаем кнопку "Назад" в зависимости от пути
    if (window.Telegram?.WebApp?.BackButton) {
      if (location.pathname !== '/') {
        // Показываем кнопку "Назад", если не на главной странице
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.BackButton.onClick(() => navigate(-1)); // Возврат на предыдущую страницу
      } else {
        // Скрываем кнопку "Назад" на главной странице
        window.Telegram.WebApp.BackButton.hide();
      }
    }
  }, [location, navigate]);

  return (
    <div className={styles.wrapper}>
      <Header />
       <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/tarot" element={<TarotList />} />
        <Route path="/magic-ball" element={<YesNoGame />} />
        <Route path="/rewards" element={<div>Rewards</div>} />
        <Route path="/payments" element={<Payments />} />
      </Routes>
      <Modal>
        <BonusBalance />
      </Modal>
    </div>
  );
};

export default App;
