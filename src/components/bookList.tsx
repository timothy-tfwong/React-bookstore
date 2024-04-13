import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { deleteBook } from "../state/books/booksSlice";
import { Button, Table } from 'react-bootstrap';
import EditBookModal from "./editBookModal";

const BookList = () => {
  const books = useSelector((state: RootState) => state.bookList.bookListData);

	const [show, setShow] = useState(false);
  const [editingBook, setEditingBook] = useState({
    id: 0,
    name: "",
    price: 0,
    category: "",
    description: "",
  });
  const dispatch = useDispatch();
  const handleShow = (book: any) => {
    setEditingBook(prevState => ({
      ...prevState,
      id: book.id,
      name: book.name,
      price: book.price,
      category: book.category,
      description: book.description,
    }));
    setShow(true);
  };
  const handleCloseEdit = () => {
    setEditingBook(prevState => ({
      ...prevState,
      id: 0,
      name: "",
      price: 0,
      category: "",
      description: "",
    }));
    setShow(false);
  };

  return (
    <div className="Book-table">
      <EditBookModal
        id={editingBook.id}
        name={editingBook.name}
        price={editingBook.price}
        category={editingBook.category}
        description={editingBook.description}
        show={show}
        closeEdit={()=>handleCloseEdit()}
      />
      <Table variant="dark" hover>
        <thead>
          <tr>
            <th scope="col">Book Name</th>
            <th scope="col">Price</th>
            <th scope="col">Catagory</th>
            <th scope="col">Total Books: {books.length}</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 && <tr><td colSpan={4}>No books in store.</td></tr>}
          {
            books.map((book, index) =>
              <tr
                key={index}
                onClick={() => handleShow(book)}>
                <td>{ book.name }</td>
                <td>{ "$"+book.price }</td>
                <td>{ book.category }</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={(e) => {dispatch(deleteBook(book.id));e.stopPropagation();}}
                    >Delete
                  </Button>
                </td>
              </tr>)
          }
        </tbody>
      </Table>
    </div>
  );
};

export default BookList;