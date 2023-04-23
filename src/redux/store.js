import { configureStore } from "@reduxjs/toolkit";

import filter from "./slices/filterSlice";

//создали хранилище
export const store = configureStore({
  reducer: {
    filter,
  },
});
