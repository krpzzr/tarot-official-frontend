import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: '',
  extraData: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpen = true;
      state.type = payload.type;
      state.extraData = payload.extraData;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = '';
      state.extraData = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;