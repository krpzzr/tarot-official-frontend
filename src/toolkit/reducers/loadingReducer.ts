import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoadingAiLayout: false,
  isLoadingAiAnswer: false,
};

const loadingSlice = createSlice({
  name: 'loadings',
  initialState,
  reducers: {
    setIsLoadingAiLayout: (state, { payload }) => {
      state.isLoadingAiLayout = payload;
    },
    setIsLoadingAiAnswer: (state, { payload }) => {
      state.isLoadingAiAnswer = payload;
    },
  },
});

export const { setIsLoadingAiLayout, setIsLoadingAiAnswer } = loadingSlice.actions;
export default loadingSlice.reducer;