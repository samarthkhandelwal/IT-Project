// React
import React, { useState } from 'react';

// Next components
import Link from 'next/link';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';

// Import static content
import exercises from '../../pages/exercises/exercises.json' assert { type: 'json' };

export default function CRUDButton({ type, create, id }) {
  // Handles state for the delete button modal
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Makes either a button, or a dropdown button
  function makeButton(urlBase, toCreate) {
    // Get URL base
    let url = '';
    if (urlBase === 'exercise') {
      url = '/exercises/edit';
    } else if (urlBase === 'workout') {
      url = '/workouts/edit';
    }

    // Only regular button for creating
    if (toCreate !== undefined) {
      return (
        <Link href={{ pathname: url, query: 'type=create' }} passHref>
          <Button variant="primary">New {urlBase}</Button>
        </Link>
      );
    }

    // Dropdown for editing and deleting
    return (
      <DropdownButton title="...">
        <Link href={{ pathname: url, query: `type=edit&id=${id}` }} passHref>
          <Dropdown.Item>Edit {urlBase}</Dropdown.Item>
        </Link>

        <Dropdown.Item onClick={handleOpen}>Delete {urlBase}</Dropdown.Item>
      </DropdownButton>
    );
  }

  // Creates the modal only if there is an id.
  function modal(toShow) {
    if (toShow !== undefined) {
      return (
        <Modal show={isOpen} onHide={handleClose} centered size="lg">
          <Modal.Header>
            <Modal.Title>
              <p>Delete exercise &#39;{exercises[id].name}&#39;?</p>
            </Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

            <Button variant="danger" onClick={handleClose}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
    return null;
  }

  return (
    <>
      {makeButton(type, create)}
      {modal(id)}
    </>
  );
}
