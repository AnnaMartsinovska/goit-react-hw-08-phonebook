import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchLogin,
  fetchLogout,
  fetchRefresh,
  fetchRegister,
} from 'services/authApi';

const initialState = {
  user: {
    name: '',
    email: '',
  },
  token: '',
  isLoggedIn: false,
  error: null,
  isRefreshing: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchLogout.fulfilled, (state, { payload }) => {
        state.user.name = '';
        state.user.email = '';
        state.token = '';
        state.isLoggedIn = false;
      })
      .addCase(fetchRefresh.fulfilled, (state, { payload }) => {
        state.user.name = payload.name;
        state.user.email = payload.email;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addMatcher(
        isAnyOf(
          fetchRegister.pending,
          fetchLogin.pending,
          fetchRefresh.pending
        ),
        (state, { payload }) => {
          state.isRefreshing = true;
          state.error = payload;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchRegister.rejected,
          fetchLogin.rejected,
          fetchRefresh.rejected
        ),
        (state, { payload }) => {
          state.isRefreshing = false;
          state.error = payload;
        }
      )
      .addMatcher(
        isAnyOf(fetchRegister.fulfilled, fetchLogin.fulfilled),
        (state, { payload }) => {
          state.user.name = payload.user.name;
          state.user.email = payload.user.email;
          state.token = payload.token;
          state.isLoggedIn = true;
          state.error = '';
          state.isRefreshing = false;
        }
      );
  },
});

export const authReducer = slice.reducer;
