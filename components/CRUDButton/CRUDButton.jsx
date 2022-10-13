// React
import React, { useState } from 'react';

// Next components
import Link from 'next/link';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';

// Firebase
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';

// Custom components
import DeleteToast from './DeleteToast';

export default function CRUDButton({ type, create, id, exerciseName }) {
  /* Handles state for the delete toast */
  const [isDeleteToast, setDeleteToast] = useState({});
  const handleToastOpen = ({ title, body, error }) => {
    setDeleteToast({ title, body, error });
  };
  const handleToastClose = () => {
    setDeleteToast(false);
  };

  /* Handles state for the delete button modal */
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    let error;
    let body;
    /* Delete the document from the collection, then display the toast. */
    deleteDoc(doc(db, 'exercises', id))
      .then(() => {
        body = `Successfully deleted ${exerciseName}`;
      })
      .catch((deleteError) => {
        error = deleteError;
      });
    setModalOpen(false);
    handleToastOpen({
      title: 'My Workout Buddy',
      body,
      error,
    });
  };

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
        <Dropdown.Item onClick={handleModalOpen}>
          Delete {urlBase}
        </Dropdown.Item>
      </DropdownButton>
    );
  }

  // Creates the modal only if there is an id.
  function makeModal(toShow) {
    if (toShow !== undefined) {
      return (
        <Modal show={isModalOpen} onHide={handleModalClose} centered size="lg">
          <Modal.Header>
            <Modal.Title>
              <p>Delete exercise &#39;{exerciseName}&#39;?</p>
            </Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>

            <Button variant="danger" onClick={handleModalClose}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
    return null;
  }

  // Creates the toast for deleting
  function makeToast({ title, body, error }) {
    if (isDeleteToast.title !== undefined) {
      if (error !== undefined) {
        return (
          <DeleteToast
            title={title}
            body={body}
            error={error}
            onClose={handleToastClose}
          />
        );
      }
      return (
        <DeleteToast title={title} body={body} onClose={handleToastClose} />
      );
    }
    return null;
  }

  return (
    <>
      {makeButton(type, create)}
      {makeModal(id)}
      {makeToast(isDeleteToast)}
    </>
  );
}
