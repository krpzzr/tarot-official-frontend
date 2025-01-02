import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { convertHashToQueryParam, getAPIUrl } from 'utils/urlUtils';

export interface ChatEntry {
  question: string;
  answer: string;
  timestamp: string;
}

// AsyncThunk для получения истории сообщений
export const fetchChatHistory = createAsyncThunk<ChatEntry[], void, { rejectValue: string }>(
  'chat/fetchChatHistory',
  async (_, { rejectWithValue }) => {
    try {
      const queryParams = convertHashToQueryParam(window.location.search);
      const response = await axios.get(`${getAPIUrl()}/chat-history?${queryParams}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch chat history.');
    }
  }
);

// AsyncThunk для отправки вопроса и получения ответа
export const sendQuestionToAI = createAsyncThunk<
  { answer: string; balance: number },
  string,
  { rejectValue: string }
>(
  'chat/sendQuestionToAI',
  async (question, { rejectWithValue }) => {
    try {
      const queryParams = convertHashToQueryParam(window.location.search);
      const response = await axios.post(`${getAPIUrl()}/chat-with-ai?${queryParams}`, { question });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to send question to AI.');
    }
  }
);
