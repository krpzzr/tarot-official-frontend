import { createSlice } from '@reduxjs/toolkit';

import { fetchCards } from 'toolkit/actions/cardActions';

export interface Card {
  id: number;
  deckType: number;
  arcana: string;
  nameRu: string;
  nameEn: string;
  suit: string | null;
  isUpright: boolean;
  uprightId: number | null;
  descriptionRu: string;
  descriptionEn: string;
  type: string;
  image: string;
}

interface CardsState {
  data: Card[];
  loading: boolean;
  error: string | null;
}

const initialState: CardsState = {
  data: [],
  loading: false,
  error: null,
};

// Слайс для карт
const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load cards';
      });
  },
});

// Экспортируем редьюсер
export default cardsSlice.reducer;
