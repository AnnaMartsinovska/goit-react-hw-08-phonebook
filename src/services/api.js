import { createAsyncThunk } from '@reduxjs/toolkit';

import { contactApi } from './authApi';

export const fetchContacts = createAsyncThunk(
  'fetchAll',
  async (_, thunkApi) => {
    try {
      const { data } = await contactApi.get('/contacts');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchAddContacts = createAsyncThunk(
  'addContact',
  async (body, thunkApi) => {
    try {
      const { data } = await contactApi.post('/contacts', body);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchDeleteContacts = createAsyncThunk(
  'deleteContact',
  async (id, thunkApi) => {
    try {
      const { data } = await contactApi.delete(`/contacts/${id}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
