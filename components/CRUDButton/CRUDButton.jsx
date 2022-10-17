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
import CustomToast from './CustomToast';

export default function CRUDButton({ type, create, id, name }) {
  /* Handles state for the delete toast */
  const [isToastActive, setToastActive] = useState({});
  const handleToastOpen = ({ title, body, error }) => {
    setToastActive({ title, body, error });
  };
  const handleToastClose = () => {
    setToastActive(false);
  };

  /* Handles state for the delete button modal */
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDelete = () => {
    // TODO: Refresh exercise/workout list after deletion.
    if (type === 'exercise') {
      deleteDoc(doc(db, 'exercises', id))
        .then(() => {
          handleToastOpen({
            title: 'Success',
            body: `Successfully deleted ${name}.`,
          });
        })
        .catch((error) => {
          handleToastOpen({
            title: 'Error',
            error,
          });
        });
    } else {
      deleteDoc(doc(db, 'workouts', id))
        .then(() => {
          handleToastOpen({
            title: 'Success',
            body: `Successfully deleted ${name}.`,
          });
        })
        .catch((error) => {
          handleToastOpen({
            title: 'Error',
            error,
          });
        });
    }

    handleModalClose();
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
              <p>
                Delete {type} &#39;{name}&#39;?
              </p>
            </Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>

            <Button variant="danger" onClick={handleDelete}>
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
    if (title !== undefined) {
      if (error !== undefined) {
        return (
          <CustomToast title={title} error={error} onClose={handleToastClose} />
        );
      }
      return (
        <CustomToast title={title} body={body} onClose={handleToastClose} />
      );
    }
    return null;
  }

  return (
    <>
      {makeButton(type, create)}
      {makeModal(id)}
      {makeToast(isToastActive)}
    </>
  );
}
