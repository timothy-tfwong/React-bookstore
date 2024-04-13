import { createSlice } from "@reduxjs/toolkit";

interface BookList {
  bookListData: Book[];
  newBookId: number
}

interface Book {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
}

const initialState: BookList = {
  bookListData: [],
  newBookId: 0
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      return {
        ...state,
        bookListData: state.bookListData.concat({...action.payload, id: state.newBookId}),
        newBookId: state.newBookId + 1
      }
    },
    deleteBook: (state, action) => {
      state.bookListData = state.bookListData.filter((book) => book.id !== action.payload);
    },
    editBook: (state, action) => {
      return { 
        ...state, 
        bookListData: state.bookListData.map(
          (book) => book.id === action.payload.id
              ? {...book, ...action.payload} : book
        )
      }
    }
  }
});

export const { addBook, deleteBook, editBook } = booksSlice.actions;
export default booksSlice.reducer;