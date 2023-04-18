import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/filterSlice'
//создали хранилище
export const store = configureStore({
  reducer: {counter: counterReducer},
})