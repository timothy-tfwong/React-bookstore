import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from 'react';
import { useEffect } from "react";
import BookList from './components/bookList';
import AddBookModal from './components/addBookModal';

function App() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <div className="App">
      <div className='App-header'>
        <h2><b>React Bookstore</b></h2>
        <AddBookModal />
      </div>
      <BookList />
    </div>
  );
}

export default App;
