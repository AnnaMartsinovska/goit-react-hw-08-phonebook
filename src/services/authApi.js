import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const contactApi = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
});

const setToken = token => {
  contactApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearToken = token => {
  contactApi.defaults.headers.common.Authorization = '';
};

export const fetchRegister = createAsyncThunk(
  'register',
  async (credentials, thunkApi) => {
    try {
      const { data } = await contactApi.post('users/signup', credentials);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  'login',
  async (credentials, thunkApi) => {
    try {
      const { data } = await contactApi.post('users/login', credentials);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchLogout = createAsyncThunk('logout', async (_, thunkApi) => {
  try {
    contactApi.post('users/logout');
    clearToken();
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const fetchRefresh = createAsyncThunk('refresh', async (_, thunkApi) => {
  const savedToken = thunkApi.getState().auth.token;
  if (!savedToken) {
    return thunkApi.rejectWithValue('Token is not existing');
  }
  try {
    setToken(savedToken);
    const { data } = await contactApi.get('users/current');
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});
