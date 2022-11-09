// React
import React from 'react';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Custom components
import List from '../List/List';

export default function AddExerciseModal({
  show,
  onClose,
  list,
  selected,
  setSelectedExercise,
}) {
  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header>
        <Modal.Title>
          <p>Add an exercise</p>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {list && (
          <List
            list={list}
            listType="radio"
            type="edit"
            selected={selected}
            setSelected={setSelectedExercise}
          />
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button variant="primary" onClick={onClose}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
