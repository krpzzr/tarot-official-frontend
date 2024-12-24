import { createSlice } from '@reduxjs/toolkit';
import { CardLayout, fetchCardLayouts } from 'toolkit/actions/cardLayoutActions';

interface CardLayoutState {
  data: CardLayout[]; // Список раскладов
  loading: boolean;      // Флаг загрузки
  error: string | null;  // Сообщение об ошибке
}

const initialState: CardLayoutState = {
  data: [],
  loading: false,
  error: null,
};

const cardLayoutSlice = createSlice({
  name: 'cardLayout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardLayouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardLayouts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCardLayouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Произошла ошибка';
      });
  },
});

export default cardLayoutSlice.reducer;
