import { configureStore } from '@reduxjs/toolkit';
import { bookCardsReducer } from './bookCardSlice/bookCardSlice';
import { openLibraryApi } from '@/shared/api/openLibraryApi';

export const makeStore = () =>
  configureStore({
    reducer: {
      bookCards: bookCardsReducer,
      [openLibraryApi.reducerPath]: openLibraryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(openLibraryApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
