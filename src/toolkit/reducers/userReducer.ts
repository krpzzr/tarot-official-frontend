import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserData } from 'toolkit/actions/userActions';

interface UserState {
  data: any;
  locale: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  locale: 'en',
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to update balance
    updateBalance(state, action: PayloadAction<number>) {
      if (state.data) {
        state.data.balance = state.data.balance + action.payload;
      }
    },
    setBalance(state, action: PayloadAction<number>) {
      if (state.data) {
        state.data.balance = action.payload;
      }
    },
    setLocale(state, action: PayloadAction<string>) {
      state.locale = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user data";
      })
  },
});

export const {
  updateBalance,
  setBalance,
  setLocale,
} = userSlice.actions;

export default userSlice.reducer;