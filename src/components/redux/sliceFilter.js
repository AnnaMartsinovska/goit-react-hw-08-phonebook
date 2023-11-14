import { createSlice } from '@reduxjs/toolkit';

export const getFilter = state => state.filter;

export const sliceFilter = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterContacts(state, action) {
      return action.payload;
    },
  },
});

export const filterReducer = sliceFilter.reducer;
export const { filterContacts } = sliceFilter.actions;
