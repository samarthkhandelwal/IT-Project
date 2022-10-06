// React
import React from 'react';

// Next components
import Link from 'next/link';
import { useRouter } from 'next/router';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Custom components
import TopNavbar from '../../../components/Navbar/Navbar';

// Styles
import styles from '../../../styles/Crud.module.css';

// Import static content
import exercises from '../exercises.json' assert { type: 'json' };
import muscles from '../muscles.json' assert { type: 'json' };

// A form used for both creating and editing exercises
function ExerciseForm({ id }) {
  let instructions = '';
  if (id !== undefined) {
    instructions += exercises[id].instructions.map(
      (step) => `Step 1: ${step}\n`
    );
  }

  return (
    <Form>
      <Form.Group controlId="formExerciseName">
        <Form.Label>Exercise name</Form.Label>
        <Form.Control
          type="exercise"
          placeholder={
            id !== undefined ? exercises[id].name : 'Enter exercise name'
          }
        />
      </Form.Group>

      <Form.Group controlId="formExerciseName">
        <Form.Label>Select targeted areas</Form.Label>
        {/* TODO: Make this grouped by muscle group. Need to adjust JSON. */}
        {/* TODO: Make some checkboxes pre-checked if editing an exercise. */}
        {muscles.map(({ mId, name }) =>
          id !== undefined ? (
            <div className="mb-3">
              <Form.Check type="checkbox" id={mId} label={`${name}`} />
            </div>
          ) : (
            <div className="mb-3">
              <Form.Check type="checkbox" id={mId} label={`${name}`} />
            </div>
          )
        )}
      </Form.Group>

      <Form.Group controlId="formVideoUrl">
        <Form.Label>Enter video url to display</Form.Label>
        <Form.Control
          type="videoURL"
          placeholder={id !== undefined ? exercises[id].videoURL : 'URL'}
        />
      </Form.Group>

      <Form.Group controlId="formThumbnail">
        <Form.Label>Select a thumbnail</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

      <Form.Group controlId="formEquipment">
        <Form.Label>Equipment needed</Form.Label>
        <Form.Control
          type="equipment"
          placeholder={
            id !== undefined ? exercises[id].name : 'Enter required equipment'
          }
        />
      </Form.Group>

      <Form.Group controlId="formSteps">
        <Form.Label>Steps to completing the exercise</Form.Label>
        <Form.Control
          type="exercise"
          as="textarea"
          rows={4}
          placeholder={id !== undefined ? instructions : 'Enter instructions'}
        />
      </Form.Group>

      <Link href="/exercises">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Link>
    </Form>
  );
}

// TODO: Ensure this page can only be accessed if signed in as admin
export default function EditExercise() {
  // Get operation type and exercise ID from query parameters
  const router = useRouter();
  const { type, id } = router.query;

  if (type === 'create' || type === 'edit') {
    return (
      <>
        <TopNavbar />
        {/* TODO: Preview of changes on side. */}
        <div className={styles.main}>
          {id !== undefined ? <ExerciseForm id={id} /> : <ExerciseForm />}
        </div>
      </>
    );
  }
  // TODO: Redirect to /exercises if invalid query params
}
