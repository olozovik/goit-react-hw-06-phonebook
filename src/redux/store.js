import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { phonebookReducer } from './phonebook/phonebook-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

const phonebookPersistConfig = {
  key: 'contacts',
  storage,
  blacklist: ['filter'],
};

const middleware = getDefaultMiddleware => {
  if (process.env.NODE_ENV === 'development') {
    return [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      logger,
    ];
  }
  return getDefaultMiddleware();
};

const store = configureStore({
  reducer: persistReducer(phonebookPersistConfig, phonebookReducer),
  devTools: process.env.NODE_ENV === 'development',
  middleware,
});

const persistor = persistStore(store);

export { store, persistor };
