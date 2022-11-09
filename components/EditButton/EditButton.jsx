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
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

// Custom components
import CustomToast from './CustomToast';

// Authentication
import { useAuth } from '../../context/authUserContext';

// Makes either a button, or a dropdown button
function AButton({ type, name, id, handleModalOpen }) {
  if (type === 'user') {
    return (
      <DropdownButton title="...">
        <Link href={`/userworkouts/edit/${id}`} passHref>
          <Dropdown.Item>Edit {name}</Dropdown.Item>
        </Link>
        <Dropdown.Item onClick={handleModalOpen}>Delete {name}</Dropdown.Item>
      </DropdownButton>
    );
  }

  if (type === 'exercise') {
    return (
      <DropdownButton title="...">
        <Link href={`/exercises/edit/${id}`} passHref>
          <Dropdown.Item>Edit {name}</Dropdown.Item>
        </Link>
        <Dropdown.Item onClick={handleModalOpen}>Delete {name}</Dropdown.Item>
      </DropdownButton>
    );
  }

  if (type === 'workout') {
    return (
      <DropdownButton title="...">
        <Link href={`/workouts/edit/${id}`} passHref>
          <Dropdown.Item>Edit {name}</Dropdown.Item>
        </Link>
        <Dropdown.Item onClick={handleModalOpen}>Delete {name}</Dropdown.Item>
      </DropdownButton>
    );
  }
}

function DeleteModal({
  name,
  type,
  isModalOpen,
  handleModalClose,
  handleDelete,
}) {
  return (
    <Modal show={isModalOpen} onHide={handleModalClose} centered size="lg">
      <Modal.Header>
        <Modal.Title>
          {type === 'user' ? (
            <p>Delete your workout &#39;{name}&#39;?</p>
          ) : (
            <p>
              Delete {type} &#39;{name}&#39;?
            </p>
          )}
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

export default function EditButton({ type, id, name, onDelete }) {
  const { authUser } = useAuth();

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
    if (type === 'user') {
      const filtered = authUser.createdWorkouts.filter(
        (workout) => workout.id !== id
      );
      authUser.createdWorkouts = filtered;
      updateDoc(doc(db, 'users', authUser.uid), {
        createdWorkouts: filtered,
      });
    }

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
    }

    if (type === 'workout') {
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
      <AButton
        type={type}
        name={name}
        id={id}
        handleModalOpen={handleModalOpen}
      />
      {id !== undefined && (
        <DeleteModal
          name={name}
          type={type}
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          handleDelete={handleDelete}
        />
      )}
      {makeToast(isToastActive)}
    </>
  );
}
