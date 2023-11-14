import { configureStore } from '@reduxjs/toolkit';
import { sliceContacts } from './sliceContacts';
import { sliceFilter } from './sliceFilter';

const store = configureStore({
  reducer: {
    contacts: sliceContacts.reducer,
    filter: sliceFilter.reducer,
  },
});

export default store;
