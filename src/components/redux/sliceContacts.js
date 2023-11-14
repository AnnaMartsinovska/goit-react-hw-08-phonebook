import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchAddContacts,
  fetchContacts,
  fetchDeleteContacts,
} from 'services/api';

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

export const getContacts = state => state.contacts.contacts;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const sliceContacts = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts = [...state.contacts, action.payload];
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.contacts = payload;
        state.loading = false;
      })
      .addCase(fetchDeleteContacts.fulfilled, (state, { payload }) => {
        state.contacts = state.contacts.filter(item => item.id !== payload.id);
        state.loading = false;
      })
      .addCase(fetchAddContacts.fulfilled, (state, { payload }) => {
        state.contacts.push(payload);
        state.loading = false;
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          fetchDeleteContacts.pending,
          fetchAddContacts.pending
        ),
        (state, { payload }) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          fetchDeleteContacts.rejected,
          fetchAddContacts.rejected
        ),
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

export const contactReducer = sliceContacts.reducer;
export const { addContact, deleteContact } = sliceContacts.actions;
