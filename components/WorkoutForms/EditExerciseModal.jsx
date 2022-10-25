// React
import React from 'react';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

// Styles
import styles from '../../styles/WorkoutForms/EditExerciseModal.module.css';

export default function EditExerciseModal({
  show,
  onClose,
  exercise,
  onSubmit,
  onDelete,
}) {
  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header>
        <Modal.Title>Editing {exercise.name}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Row>
            <Col xs={2} className={styles.reps}>
              Reps
            </Col>

            <Col xs={4}>
              <Form.Control id="newreps" defaultValue={exercise.reps} />
            </Col>

            <Col xs={2} className={styles.sets}>
              Sets
            </Col>

            <Col xs={4}>
              <Form.Control id="newsets" defaultValue={exercise.sets} />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className={styles.buttons}>
          <Button variant="danger" onClick={onDelete}>
            Delete exercise
          </Button>

          <div>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>{' '}
            <Button variant="primary" onClick={onClose} type="submit">
              Submit
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
