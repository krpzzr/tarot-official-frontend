import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { openModal } from 'toolkit/reducers/modalReducer'; 
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
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await axios.get(`${getAPIUrl()}/user?${queryString}`);

    // Проверяем условие на passive_income и вызываем openModal
    // if (response.data.passive_income > 0) {
    //   dispatch(openModal({ type: 'passiveIncome' }));
    // }
    return response.data;
  }
);