import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from 'components/Header';
import TarotCard from 'components/Tarot';
import YesNoGame from 'components/MysteryBall';
import BottomNavigation from 'components/BottomNavigation';
import { convertHashToQueryParam, getAPIUrl } from 'utils/urlUtils';

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
  const [currentView, setCurrentView] = useState<string>("magic-ball");
  const [isPaymentSuccess, setPayment] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();

      try {
        // @ts-ignore
        // window.Telegram.WebApp.requestFullscreen();
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

  const handleTransactionRequest = async () => {
    if (!window.Telegram.WebApp.initDataUnsafe.user) return;
    const userId = window.Telegram.WebApp.initDataUnsafe.user.id;

    try {
      const response = await fetch(`${getAPIUrl()}/create-invoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });
  
      const data = await response.json();
      if (data.success) {
        window.Telegram.WebApp.openInvoice(data.invoiceLink, (status) => {
          if (status === "paid") {
            setPayment(true);
            alert('Счёт успешно создан. Проверьте ваше приложение Telegram.');
          }
        })
      } else {
        alert('Ошибка создания счёта: ' + data.message);
      }
    } catch (error) {
      console.error('Ошибка запроса:', error);
      alert('Не удалось создать счёт. Попробуйте позже.');
    }
  };

  const askQuestion = async () => {
    const queryParams = convertHashToQueryParam(window.location.search);
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await axios.post(`${getAPIUrl()}/detailed-layout?${queryString}`);
  
    const data = await response.data;
    console.log('Answer from OpenAI:', data.answer);
    setAnswer(data.answer);
  };

  return (
    <div>
      <Header />
      <button onClick={handleTransactionRequest}>But 50 stars</button>
      <button onClick={askQuestion}>Задать вопрос ИИ</button>
      {isPaymentSuccess && 'Оплата прошла успешно вот ваш контент'}
      <div 
        style={{ padding: '10px', fontFamily: 'Arial, sans-serif' }}
        dangerouslySetInnerHTML={{ __html: formatText(answer) }}
      />
      {currentView === "tarot" && <TarotCard />}
      {currentView === "magic-ball" && <YesNoGame />}
      {currentView === "rewards" && <div>Rewards</div>}
      <BottomNavigation setCurrentView={setCurrentView} screen={currentView} />
    </div>
  );
};

export default App;
