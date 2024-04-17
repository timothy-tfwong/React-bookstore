import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../state/books/booksSlice";
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';

const AddBookModal = () => {
	const [newBook, setNewBook] = useState({ 
		name: "",
		price: 0,
		category: "",
		description: "",
	});
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);

	const handleClose = () => {
		setValidated(false);
		setNewBook(prevState => ({
			...prevState,
			name: "",
			price: 0,
			category: "",
			description: "",
		}));
		setShow(false);
	};
	const handleShow = () => setShow(true);
	const handleSubmit = (event: any) => {
		const form = event.currentTarget;
		setValidated(true);
		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			dispatch(addBook(newBook));
			handleClose();
		}
		event.preventDefault();
	};

	return (
		<div>
			<Button
				variant="primary"
				onClick={handleShow}
				>Add a Book</Button>

			<Modal className="Modal-style" data-bs-theme="dark" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationName">
                <Form.Label>Book name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Book name"
                  value={newBook.name}
                  onChange={(e) => setNewBook(prevState => ({
                    ...prevState,
                    name: e.target.value})
                  )}
                />
                <Form.Control.Feedback type="invalid">
                    Please input book name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationPrice">
                <Form.Label>Price</Form.Label>
                <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                    <Form.Control
                      required
                      type="number"
                      step="0.01"
                      placeholder="Price"
                      value={newBook.price}
                      onChange={(e) => setNewBook(prevState => ({
                        ...prevState,
                        price: Number(e.target.value)})
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please input book price.
                    </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCategory">
                <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Category"
                    required
                    value={newBook.category}
                    onChange={(e) => setNewBook(prevState => ({
                      ...prevState,
                      category: e.target.value})
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                      Please input book category.
                  </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="validationDescription">
                <Form.Label>Book Description</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={3}
                  placeholder="Book description"
                  value={newBook.description}
                  onChange={(e) => setNewBook(prevState => ({
                    ...prevState,
                    description: e.target.value})
                  )}
                />
                <Form.Control.Feedback type="invalid">
                    Please input book description.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
			</Modal>
		</div>
	);
};

export default AddBookModal;