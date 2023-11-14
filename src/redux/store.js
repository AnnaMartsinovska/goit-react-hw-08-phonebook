import { configureStore } from '@reduxjs/toolkit';
import { sliceContacts } from './sliceContacts';
import { sliceFilter } from './sliceFilter';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from 'auth/slice';

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['token'],
};

const persReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    contacts: sliceContacts.reducer,
    filter: sliceFilter.reducer,
    auth: persReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
