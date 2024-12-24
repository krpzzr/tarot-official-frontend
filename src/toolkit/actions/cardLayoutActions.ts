import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { convertHashToQueryParam, getAPIUrl } from 'utils/urlUtils';

interface FetchCardLayoutsParams {
  type?: string; // Фильтр по типу (опционально)
}

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