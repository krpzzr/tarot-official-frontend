import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Card } from 'toolkit/reducers/cardsReducer';
import { convertHashToQueryParam, getAPIUrl } from 'utils/urlUtils';

// Асинхронный thunk для получения списка раскладов
export const fetchCards = createAsyncThunk<
  Card[],
  undefined,
  { rejectValue: string }
>('cards/fetchCards', async (_, { rejectWithValue }) => {
  try {
    const queryParams = convertHashToQueryParam(window.location.search);
    const response = await axios.get(`${getAPIUrl()}/cards?${queryParams}`);

    if (response.data) {
      return response.data;
    } else {
      return rejectWithValue('Ошибка загрузки раскладов.');
    }
  } catch (error) {
    console.error('Ошибка запроса:', error);
    return rejectWithValue('Не удалось загрузить расклады. Попробуйте позже.');
  }
});
