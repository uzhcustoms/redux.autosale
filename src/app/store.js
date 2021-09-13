import { configureStore } from '@reduxjs/toolkit';
import autoReducer from '../reducers/autoSlice';

export const store = configureStore({
  reducer: {
    auto: autoReducer,
  },
});
