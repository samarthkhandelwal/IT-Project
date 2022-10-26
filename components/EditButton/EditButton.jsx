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

export default function EditButton({ type, id, name, onDelete }) {
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
    onDelete(id);
    handleModalClose();
  };

  // Makes either a button, or a dropdown button
  const makeButton = (title) => (
    <DropdownButton title="...">
      {title === 'exercise' ? (
        <Link href={`/exercises/edit/${id}`} passHref>
          <Dropdown.Item>Edit {title}</Dropdown.Item>
        </Link>
      ) : (
        <Link href={`/workouts/edit/${id}`} passHref>
          <Dropdown.Item>Edit {title}</Dropdown.Item>
        </Link>
      )}

      <Dropdown.Item onClick={handleModalOpen}>Delete {title}</Dropdown.Item>
    </DropdownButton>
  );

  // Creates the modal only if there is an id.
  const makeModal = (toShow) => {
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
  };

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
      {makeButton(type)}
      {makeModal(id)}
      {makeToast(isToastActive)}
    </>
  );
}
