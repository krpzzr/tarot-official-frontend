import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { openModal, closeModal } from 'toolkit/reducers/modalReducer';
import { setBalance, updateBalance } from 'toolkit/reducers/userReducer';
import { getAPIUrl } from 'utils/urlUtils';

interface UserData {
  id: number;
  username: string;
  avatar: string;
  score: number;
}

export const fetchUserData = createAsyncThunk<
  UserData,
  string,
  { dispatch: any }
>(
  "user/fetchUserData",
  async (queryParams: string, { dispatch }) => {
    const response = await axios.get(`${getAPIUrl()}/user?${queryParams}`);

    // Проверяем условие на passive_income и вызываем openModal
    if (response.data.bonusBalance > 0) {
      dispatch(openModal({ type: 'bonusBalance' }));
    }
    return response.data;
  }
);

export const fetchUserBonus = createAsyncThunk<
  UserData,
  string,
  { dispatch: any }
>(
  "user/fetchUserBonus",
  async (queryParams: string, { dispatch }) => {
    const response = await axios.get(`${getAPIUrl()}/claim-bonus?${queryParams}`);

    dispatch(closeModal());

    dispatch(setBalance(response.data.balance));

    return response.data;
  }
);