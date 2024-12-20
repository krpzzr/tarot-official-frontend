import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

import Header from 'components/Header';
import MainPage from 'components/MainPage';
import TarotList from 'components/TarotList';
import YesNoGame from 'components/MysteryBall';
import BottomNavigation from 'components/BottomNavigation';
import { convertHashToQueryParam, getAPIUrl } from 'utils/urlUtils';

import styles from './styles.module.scss';

interface EventData {
  eventType: string;
  payload: any;
}

const formatText = (text: string) => {
  // Заменяем \n на <br /> для переноса строк
  let formattedText = text.replace(/\n/g, '<br />');
  
  // Заменяем **текст** на <strong>текст</strong> для жирного текста
  formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  return formattedText;
};

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // const [currentView, setCurrentView] = useState<string>("magic-ball");
  // const [isPaymentSuccess, setPayment] = useState<boolean>(false);
  // const [answer, setAnswer] = useState<string>('');

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

  // const handleTransactionRequest = async () => {
  //   if (!window.Telegram.WebApp.initDataUnsafe.user) return;
  //   const userId = window.Telegram.WebApp.initDataUnsafe.user.id;

  //   try {
  //     const response = await fetch(`${getAPIUrl()}/create-invoice`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ user_id: userId }),
  //     });
  
  //     const data = await response.json();
  //     if (data.success) {
  //       window.Telegram.WebApp.openInvoice(data.invoiceLink, (status) => {
  //         if (status === "paid") {
  //           setPayment(true);
  //           alert('Счёт успешно создан. Проверьте ваше приложение Telegram.');
  //         }
  //       })
  //     } else {
  //       alert('Ошибка создания счёта: ' + data.message);
  //     }
  //   } catch (error) {
  //     console.error('Ошибка запроса:', error);
  //     alert('Не удалось создать счёт. Попробуйте позже.');
  //   }
  // };

  return (
    <div className={styles.wrapper}>
      <Header />
       <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/tarot" element={<TarotList />} />
        <Route path="/magic-ball" element={<YesNoGame />} />
        <Route path="/rewards" element={<div>Rewards</div>} />
      </Routes>
      {/* <BottomNavigation /> */}
    </div>
  );
};

export default App;
