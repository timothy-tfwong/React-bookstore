import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editBook } from "../state/books/booksSlice";
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';

interface editBookProps {
	id: number,
	name: string,
	price: number,
	category: string,
	description: string,
	show: boolean,
	closeEdit: any
}

const EditBookModal = (props: editBookProps) => {
	const [editingBook, setEditingBook] = useState({
		id: props.id,
		name: props.name,
		price: props.price,
		category: props.category,
		description: props.description,
	});
	const dispatch = useDispatch();
	const [validated, setValidated] = useState(false);
	useEffect(() => {
		setEditingBook(prevState => ({
			...prevState,
			id: props.id,
			name: props.name,
			price: props.price,
			category: props.category,
			description: props.description,
		}));
	}, [props]);
	const handleClose = () => {
		setValidated(false);
		props.closeEdit();
	};
	const handleSubmit = (event: any) => {
		const form = event.currentTarget;
		setValidated(true);
		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			dispatch(editBook(editingBook));
			handleClose();
		}
		event.preventDefault();
	};

	return (
		<Modal className="Modal-style" data-bs-theme="dark" show={props.show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Book</Modal.Title>
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
								value={editingBook.name}
								onChange={(e) => setEditingBook(prevState => ({
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
										value={editingBook.price}
										onChange={(e) => setEditingBook(prevState => ({
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
									value={editingBook.category}
									onChange={(e) => setEditingBook(prevState => ({
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
								value={editingBook.description}
								onChange={(e) => setEditingBook(prevState => ({
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
	);
};

export default EditBookModal;