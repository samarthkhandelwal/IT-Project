// Bootstrap components
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Custom components
import YouTube from '../Video/Video';
import Element from '../List/Element';

// React
import React, { useEffect, useState } from 'react';

export default function ExerciseElement({ exercise, updateCard }) {
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* Only render Modal if innerWidth < 576px (small breakpoint) */
  const [toRenderModal, setRenderModal] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 576) {
      setRenderModal(true);
    }
  }, []);

  /* Handles the onClick events for each exercise.
   * The split is needed to handle both mobile/desktop views at the same time.
   */
  const onClick = () => {
    if (toRenderModal) {
      handleOpen();
    }
    updateCard(exercise.id);
  };

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
