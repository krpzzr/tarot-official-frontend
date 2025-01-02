import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChatEntry, fetchChatHistory, sendQuestionToAI } from 'toolkit/actions/chatHistoryActions';

interface ChatState {
  history: ChatEntry[];
  isLoading: boolean;
  error: string | null;
  balance: number | null;
}

const initialState: ChatState = {
  history: [],
  isLoading: false,
  error: null,
  balance: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearChatHistory: (state) => {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch chat history
      .addCase(fetchChatHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action: PayloadAction<ChatEntry[]>) => {
        state.isLoading = false;
        state.history = action.payload;
      })
      .addCase(fetchChatHistory.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || 'Error fetching chat history.';
      })
      // Send question to AI
      .addCase(sendQuestionToAI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendQuestionToAI.fulfilled, (state, action) => {
        state.isLoading = false;
        const question = action.meta.arg;

        state.history.unshift({
          question: question,
          answer: action.payload.answer,
          timestamp: new Date().toISOString(),
        });
      
        state.balance = action.payload.balance;
      })
      .addCase(sendQuestionToAI.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || 'Error sending question to AI.';
      });
  },
});

export const { clearChatHistory } = chatSlice.actions;

export default chatSlice.reducer;
