// React
import React from 'react';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Custom components
import TopNavbar from '../../../components/Navbar/Navbar';

// Styles
import styles from '../../../styles/Crud.module.css';

// The different areas an exercise can target
const targets = [
  'Chest',
  'Triceps',
  'Hamstrings',
  'Glutes',
  'Quadriceps',
  'Calves',
  'Back',
  'Biceps',
  'Shoulders',
  'Core',
  'Abs',
];

function CreateExercise() {
  return (
    <Form>
      <Form.Group controlId="formExerciseName">
        <Form.Label>Exercise name</Form.Label>
        <Form.Control type="exercise" placeholder="Enter exercise name" />
      </Form.Group>

      <Form.Group controlId="formExerciseName">
        <Form.Label>Select targeted areas</Form.Label>
        <Form.Select multiple aria-label="Default select example">
          {targets.map((target) => (
            <option value="{target}">{target}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="formVideoUrl">
        <Form.Label>Enter video url to display</Form.Label>
        <Form.Control type="videoURL" placeholder="URL" />
      </Form.Group>

      <Form.Group controlId="formThumbnail">
        <Form.Label>Upload picture of the exercise</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

      <Form.Group controlId="formEquipment">
        <Form.Label>Equipment needed</Form.Label>
        <Form.Control type="equipment" placeholder="Enter equipment needed" />
      </Form.Group>

      <Form.Group controlId="formSteps">
        <Form.Label>Steps to completing the exercise</Form.Label>
        <Form.Control type="exercise" placeholder="Enter steps" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

function UpdateExercise() {}

function DeleteExercise() {}

// TODO: Ensure this page can only be accessed if signed in as admin
export default function EditExercise({ crudOperation }) {
  function getForm(operation) {
    if (operation === 'create') {
      return <CreateExercise />;
    }

    if (operation === 'update') {
      return <UpdateExercise />;
    }

    if (operation === 'delete') {
      return <DeleteExercise />;
    }
    return <h2>Invalid operation on exercise.</h2>;
  }

  return (
    <>
      <TopNavbar />
      <div className={styles.main}>{getForm(crudOperation)}</div>
    </>
  );
}
