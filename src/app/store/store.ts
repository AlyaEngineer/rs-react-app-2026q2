import { configureStore } from '@reduxjs/toolkit';
import { bookCardsReducer } from './bookCardSlice/bookCardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { openLibraryApi } from '@/shared/api/openLibraryApi';

export const store = configureStore({
  reducer: {
    bookCards: bookCardsReducer,
    [openLibraryApi.reducerPath]: openLibraryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(openLibraryApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();
