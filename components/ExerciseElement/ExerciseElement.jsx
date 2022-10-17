// React
import React, { useEffect, useState } from 'react';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Custom components
import Video from '../Video/Video';
import Element from '../List/Element';

/* A small extension of the Element defined in components/List/Element.
 * Handles a Modal popup or side card update when an element is clicked.
 */
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
   * If the window width is small, the modal is opened when the elements are
   * clicked. Otherwise, the card is updated.
   */
  const onClick = () => {
    if (toRenderModal) {
      handleOpen();
    } else {
      updateCard(exercise.id);
    }
  };

  return (
    <>
      <Element element={exercise} onClick={onClick} />

      <Modal show={isOpen} onHide={handleClose} centered scrollable size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{exercise.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Video link={exercise.videoURL} titleAlt={`${exercise.name} Video`} />
          {exercise.instructions}
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
