import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Card } from 'toolkit/reducers/cardsReducer';
import { setBalance } from 'toolkit/reducers/userReducer';
import { convertHashToQueryParam, getAPIUrl } from 'utils/urlUtils';
import { RootState } from 'toolkit/store'; // Импортируйте тип состояния вашего приложения

export interface CardLayout {
  id: number;
  title_ru: string;
  title_en: string;
  description_ru: string;
  description_en: string;
  card_count: number;
  type: string;
  layout_type: number;
  price: number;
}

// Асинхронный thunk для получения списка раскладов
export const fetchCardLayouts = createAsyncThunk<
  CardLayout[],
  undefined,
  { rejectValue: string }
>('cardLayout/fetchCardLayouts', async (_, { rejectWithValue }) => {
  try {
    const queryParams = convertHashToQueryParam(window.location.search);
    const response = await axios.get(`${getAPIUrl()}/card-layout?${queryParams}`);

    if (response.data.success) {
      return response.data.data;
    } else {
      return rejectWithValue('Ошибка загрузки раскладов.');
    }
  } catch (error) {
    console.error('Ошибка запроса:', error);
    return rejectWithValue('Не удалось загрузить расклады. Попробуйте позже.');
  }
});

export const createCardLayout = createAsyncThunk<
  any,
  { cardLayoutId: number; cards: Card[]; question?: string },
  { state: RootState; rejectValue: any }
>(
  'cardLayout/createCardLayout',
  async (data, thunkAPI) => {
    try {
      const queryParams = convertHashToQueryParam(window.location.search);
      const response = await axios.post(`${getAPIUrl()}/create-card-layout?${queryParams}`, {
        cardLayoutId: data.cardLayoutId,
        cards: data.cards,
        question: data.question,
      });
      const state = thunkAPI.getState();
      thunkAPI.dispatch(setBalance(state.user.data.balance - 5));
      return response.data; // Возвращаем успешный результат
    } catch (error: any) {
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data); // Если есть ошибка от сервера
      }
      return thunkAPI.rejectWithValue({ message: 'An error occurred while creating the card layout.' });
    }
  }
);