import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { convertHashToQueryParam, getAPIUrl } from 'utils/urlUtils';

interface CreateInvoiceParams {
  amount: number;
  type: string;
}

// Асинхронный thunk для создания счёта
export const createInvoice = createAsyncThunk<
  void,
  CreateInvoiceParams,
  { rejectValue: string }
>('payment/createInvoice', async ({ amount, type }, { rejectWithValue }) => {
  try {
    const queryParams = convertHashToQueryParam(window.location.search);
    const response = await axios.post(`${getAPIUrl()}/create-invoice?${queryParams}`, {
      amount,
      type,
    });

    const data = response.data;

    if (data.success) {
      window.Telegram.WebApp.openInvoice(data.invoiceLink, (status) => {
        if (status === 'paid') {
          alert('Счёт успешно создан. Проверьте ваше приложение Telegram.');
        }
      });
    } else {
      alert('Ошибка создания счёта: ' + data.message);
      return rejectWithValue(data.message);
    }
  } catch (error) {
    console.error('Ошибка запроса:', error);
    return rejectWithValue('Не удалось создать счёт. Попробуйте позже.');
  }
});