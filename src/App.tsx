import React, { useState } from 'react';

import Header from 'components/Header';
import TarotCard from 'components/Tarot';
import YesNoGame from 'components/MysteryBall';
import BottomNavigation from 'components/BottomNavigation';

const App = () => {
  const [currentView, setCurrentView] = useState<string>("magic-ball");

  return (
    <div>
      <Header />
      {currentView === "tarot" && <TarotCard />}
      {currentView === "magic-ball" && <YesNoGame />}
      {currentView === "rewards" && <div>Rewards</div>}
      <BottomNavigation setCurrentView={setCurrentView} screen={currentView} />
    </div>
  );
};

export default App;
