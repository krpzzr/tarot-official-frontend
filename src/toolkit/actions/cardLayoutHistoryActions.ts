import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { CardLayoutHistory } from 'toolkit/reducers/cardLayoutHistoryReducer';
import { convertHashToQueryParam, getAPIUrl } from 'utils/urlUtils';

// Асинхронный thunk для загрузки истории раскладов
export const fetchCardLayoutHistory = createAsyncThunk<
  CardLayoutHistory[], // Возвращаемый тип
  void, // Аргументы
  { rejectValue: string } // Тип ошибки
>('cardLayoutHistory/fetch', async (_, { rejectWithValue }) => {
  try {
    const queryParams = convertHashToQueryParam(window.location.search);
    const response = await axios.get(`${getAPIUrl()}/card-layout-history?${queryParams}`);
    return response.data; // Предполагаем, что API возвращает массив раскладов
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch history');
  }
});