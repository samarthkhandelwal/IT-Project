// Bootstrap components
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Custom components
import YouTube from '../Video/Video';
import Element from '../List/Element';

// React
import React, { useEffect, useState, useRef } from 'react';

export default function ExerciseElement({ exercise, updateCard }) {
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let toRenderModal = useRef(false);
  const onClick = () => {
    if (toRenderModal.current) {
      handleOpen();
    }
    updateCard(exercise.id);
  };

  useEffect(() => {
    if (window.innerWidth <= 576) {
      toRenderModal.current = true;
    }
  });

  return (
    <>
      <Element element={exercise} onClick={onClick} />

      <Modal show={isOpen} onHide={handleClose} centered scrollable size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{exercise.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <YouTube link={exercise.videoURL} />
          {exercise.instructions.map((step, index) => (
            <p key={index}>
              Step {index + 1}: {step}
            </p>
          ))}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
