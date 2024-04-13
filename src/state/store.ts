import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./books/booksSlice";

export const store = configureStore({
  reducer: {
    bookList: booksReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;