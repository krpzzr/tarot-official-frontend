import { configureStore } from '@reduxjs/toolkit';

import userReducer from './reducers/userReducer';
import modalReducer from './reducers/modalReducer'
import cardLayoutReducer from './reducers/cardLayoutReducer';
import cardsReducer from './reducers/cardsReducer';
import cardLayoutHistoryReducer from './reducers/cardLayoutHistoryReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    layouts: cardLayoutReducer,
    cards: cardsReducer,
    layoutHistory: cardLayoutHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;