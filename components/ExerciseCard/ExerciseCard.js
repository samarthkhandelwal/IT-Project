import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import YouTube from '../YouTube';

export default function ExerciseCard({ instructions, link }) {
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const jsxInstructions = [];
  for (let i in instructions) {
    jsxInstructions.push(
      <p>
        Step {i}: {instructions[i]}
      </p>
    );
  }

  return (
    <>
      <Button variant="primary" onClick={handleOpen}>
        View exercise
      </Button>

      <Modal show={isOpen} onHide={handleClose} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <YouTube link={link} />
          {jsxInstructions}
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
