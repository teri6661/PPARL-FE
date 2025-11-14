import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { LuCheck } from 'react-icons/lu';

const CategoryModal = ({ show, onHide, onSubmit }) => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#8a40c9'); // Default color

  const colorOptions = [
    '#8a40c9', '#ff0057', '#007bff', '#28a745',
    '#ffc107', '#dc3545', '#6f42c1', '#17a2b8'
  ];

  const handleSubmit = () => {
    if (categoryName.trim()) {
      onSubmit({
        value: categoryName.trim(),
        label: categoryName.trim(),
        color: color,
      });
      // Reset form setelah submit
      setCategoryName('');
      setDescription('');
      setColor('#8a40c9');
      onHide();
    } else {
      alert("Category Name cannot be empty.");
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      size="md"
      className="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <div>
            <p className="fw-bolder fs-5 mb-1">Create New Category</p>
            <p className="text-muted fs-2 mb-0">
              Add a new category for internal projects
            </p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label className="fs-3 text-dark">Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fs-3 text-dark">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Enter category description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fs-3 text-dark">Color</Form.Label>
          <div className="d-flex flex-wrap gap-2">
            {colorOptions.map((c) => (
              // Kontainer warna
              <div
                key={c}
                className="color-option p-2 rounded-circle border border-2 shadow-sm d-flex justify-content-center align-items-center" // Tambahkan d-flex untuk centering
                style={{
                  backgroundColor: c,
                  width: '35px',
                  height: '35px',
                  cursor: 'pointer',
                  // box shadow untuk visual terpilih tanpa checklist (opsional)
                  boxShadow: color === c ? `0 0 0 3px white, 0 0 0 5px ${c}` : 'none'
                }}
                onClick={() => setColor(c)}
                title={c}
              >
                {/* Ikon Checklist hanya muncul jika warna ini adalah warna yang dipilih */}
                {color === c && (
                  <LuCheck size={20} color="white" />
                )}
              </div>
            ))}
          </div>
        </Form.Group>

      </Modal.Body>
      <Modal.Footer className="border-0 justify-content-end">
        <Button variant="outline-danger" onClick={onHide}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="primary">
          Add Category
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryModal;