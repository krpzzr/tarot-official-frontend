import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchCardLayoutHistory } from 'toolkit/actions/cardLayoutHistoryActions';

// Тип данных для одного расклада
export interface CardLayoutHistory {
  id: number;
  cardLayout: { id: number; name: string; layout_type: number }; // Типизируем cardLayout
  cards: number[];
  createdAt: string;
  question?: string;
  aiAnswer?: string;
}

// Тип состояния
interface CardLayoutHistoryState {
  data: CardLayoutHistory[];
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: CardLayoutHistoryState = {
  data: [],
  loading: false,
  error: null,
};

// Создаем slice
const cardLayoutHistorySlice = createSlice({
  name: 'cardLayoutHistory',
  initialState,
  reducers: {
    clearHistory: (state) => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardLayoutHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardLayoutHistory.fulfilled, (state, action: PayloadAction<CardLayoutHistory[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCardLayoutHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспортируем actions и reducer
export const { clearHistory } = cardLayoutHistorySlice.actions;
export default cardLayoutHistorySlice.reducer;
