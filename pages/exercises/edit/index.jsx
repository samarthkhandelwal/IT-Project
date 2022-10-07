// React
import React from 'react';

// Next components
import Link from 'next/link';
import { useRouter } from 'next/router';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// Custom components
import TopNavbar from '../../../components/Navbar/Navbar';

// Styles
import styles from '../../../styles/Crud.module.css';

// Import static content
import exercises from '../exercises.json' assert { type: 'json' };
import muscles from '../muscles.json' assert { type: 'json' };

// A form used for both creating and editing exercises
function ExerciseForm({ id }) {
  // Create checkboxes for all muscles, and pre-check boxes if editing
  const checkboxes = [];
  const preChecked = id !== undefined ? exercises[id].muscles : [];
  for (let i = 0; i < muscles.length; i += 1) {
    const { group, musclesList } = muscles[i];
    const column = { group, boxes: [] };
    for (let j = 0; j < musclesList.length; j += 1) {
      const { mId, name } = musclesList[j];
      column.boxes.push(
        <div className="mb-3">
          {preChecked.includes(name) ? (
            <Form.Check type="checkbox" id={mId} label={name} defaultChecked />
          ) : (
            <Form.Check type="checkbox" id={mId} label={name} />
          )}
        </div>
      );
    }
    checkboxes.push(column);
  }

  let instructions = '';
  if (id !== undefined) {
    for (let i = 0; i < exercises[id].instructions.length; i += 1) {
      instructions += `${i + 1}) ${exercises[id].instructions[i]}\n`;
    }
  }

  return (
    <Form>
      <Form.Group controlId="formExerciseName">
        <Form.Label>Exercise name</Form.Label>
        {id !== undefined ? (
          <Form.Control type="exercise" defaultValue={exercises[id].name} />
        ) : (
          <Form.Control type="exercise" placeholder="Enter exercise name" />
        )}
      </Form.Group>

      <Form.Group controlId="formExerciseName">
        <Form.Label>Select targeted areas</Form.Label>
        <Container fluid>
          <Row>
            {checkboxes.map(({ group, boxes }) => (
              <Col>
                <b>{group}</b>
                {boxes}
              </Col>
            ))}
          </Row>
        </Container>
      </Form.Group>

      <Form.Group controlId="formVideoUrl">
        <Form.Label>Enter video url to display</Form.Label>
        {id !== undefined ? (
          <Form.Control type="videoURL" defaultValue={exercises[id].videoURL} />
        ) : (
          <Form.Control type="videoURL" placeholder="Enter video URL" />
        )}
      </Form.Group>

      <Form.Group controlId="formThumbnail">
        <Form.Label>Select a thumbnail</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

      <Form.Group controlId="formEquipment">
        <Form.Label>Equipment needed</Form.Label>
        {id !== undefined ? (
          <Form.Control
            type="equipment"
            defaultValue={exercises[id].equipment}
          />
        ) : (
          <Form.Control
            type="equipment"
            placeholder="Enter required equipment"
          />
        )}
      </Form.Group>

      <Form.Group controlId="formSteps">
        <Form.Label>Steps to completing the exercise</Form.Label>
        {id !== undefined ? (
          <Form.Control type="exercise" as="textarea" rows={5}>
            {instructions}
          </Form.Control>
        ) : (
          <Form.Control
            type="exercise"
            as="textarea"
            rows={5}
            placeholder="Enter instructions"
          />
        )}
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
