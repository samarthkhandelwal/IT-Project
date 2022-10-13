// React
import React, { useEffect, useState } from 'react';

// Next components
import { useRouter } from 'next/router';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// Firebase
import { getDoc, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase-config';

// Custom components
import TopNavbar from '../../../components/Navbar/Navbar';

// Styles
import styles from '../../../styles/Crud.module.css';

// Get muscle list
import muscles from '../muscles.json' assert { type: 'json' };

// Get reference to workouts collection
const exercisesCollectionRef = collection(db, 'exercises');

// A form used for both creating and editing exercises
function ExerciseForm({ id }) {
  /* Handles state for the exercise */
  const [exercise, setExercise] = useState({});

  /* Handles state for the checkboxes */
  const [checkboxes, setCheckboxes] = useState([]);

  /* Handles state for validation of form */
  // TODO: Form validation
  // const [validated, setValidated] = useState(false);

  useEffect(() => {
    const getExercise = async () => {
      const exerciseDoc = await getDoc(doc(db, 'exercises', id));
      setExercise(exerciseDoc.data());
    };

    const makeCheckboxes = () => {
      const checkboxColumns = [];
      // Create checkboxes for all muscles, and pre-check boxes if editing
      const preChecked =
        exercise.muscleGroups !== undefined ? exercise.muscleGroups : [];
      for (let i = 0; i < muscles.length; i += 1) {
        const { group, musclesList } = muscles[i];
        const boxes = [];
        for (let j = 0; j < musclesList.length; j += 1) {
          const { mId, name } = musclesList[j];
          boxes.push(
            <div className="mb-3" key={mId}>
              {preChecked.includes(name) ? (
                <Form.Check
                  type="checkbox"
                  id="exerciseMuscleGroups"
                  value={name}
                  label={name}
                  key={name}
                  defaultChecked
                />
              ) : (
                <Form.Check
                  type="checkbox"
                  id="exerciseMuscleGroups"
                  value={name}
                  label={name}
                  key={name}
                />
              )}
            </div>
          );
        }
        /* TODO: This is still giving unique key errors, not sure why. */
        checkboxColumns.push(
          <Col key={group}>
            <b>{group}</b>
            {boxes}
          </Col>
        );
      }
      return checkboxColumns;
    };

    if (id !== undefined) {
      getExercise();
    }
    setCheckboxes(makeCheckboxes);
  }, [id, exercise.muscleGroups]);

  const addExercise = ({
    name,
    muscleGroups,
    equipment,
    imageSource,
    imageAlt,
    videoURL,
    instructions,
  }) => {
    addDoc(exercisesCollectionRef, {
      name,
      muscleGroups,
      imageSource,
      imageAlt,
      instructions,
      videoURL,
      equipment,
    })
      .then(() => {
        console.log('Added document successfully.');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editExercise = ({
    name,
    muscleGroups,
    equipment,
    imageSource,
    imageAlt,
    videoURL,
    instructions,
  }) => {
    updateDoc(doc(db, 'exercises', id), {
      name,
      muscleGroups,
      equipment,
      imageSource,
      imageAlt,
      videoURL,
      instructions,
    })
      .then(() => {
        console.log('Updated document successfully.');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* Hanles the submission of forms. */
  const handleSubmit = async (event) => {
    /* Prevent automatic submission and refreshing of the page. */
    event.preventDefault();

    /* TODO: Implement muscleGroups and image uploading */
    const data = {
      name: event.target.exerciseName.value,
      videoURL: event.target.exerciseURL.value,
      instructions: event.target.exerciseInstructions.value,
      equipment: event.target.exerciseEquipment.value,
      imageSource: '',
      imageAlt: '',
      muscleGroups: [],
    };

    /* Send the form data to the API and get a response */
    const response = await fetch('/api/exercise', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const result = await response.json();
    if (id !== undefined) {
      editExercise(result.data);
    } else {
      addExercise(result.data);
    }
  };

  return (
    <div className={styles.form}>
      <h2>
        {id !== undefined
          ? `Editing '${exercise.name}'`
          : 'Creating new exercise'}
      </h2>

      <Form onSubmit={handleSubmit} action="/api/exercise" method="post">
        <Form.Group>
          <Form.Label>Exercise name</Form.Label>
          {id !== undefined ? (
            <Form.Control
              id="exerciseName"
              type="text"
              defaultValue={exercise.name}
            />
          ) : (
            <Form.Control
              id="exerciseName"
              type="text"
              placeholder="Enter exercise name"
            />
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Select targeted areas</Form.Label>
          <Container fluid>
            <Row>{checkboxes}</Row>
          </Container>
        </Form.Group>

        <Form.Group>
          <Form.Label>Enter video url to display</Form.Label>
          {id !== undefined ? (
            <Form.Control
              id="exerciseURL"
              type="url"
              defaultValue={exercise.videoURL}
            />
          ) : (
            <Form.Control
              id="exerciseURL"
              type="url"
              placeholder="Enter video URL"
            />
          )}
        </Form.Group>

        {/* Not going to work just yet */}
        {/* <Form.Group controlId="formThumbnail">
          <Form.Label>Select a thumbnail</Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <Form.Group controlId="formImageAlt">
          <Form.Label>Enter text to show if image doesn&apos;t load</Form.Label>
          {id !== undefined ? (
            <Form.Control type="imageAlt" defaultValue={exercise.imageAlt} />
          ) : (
            <Form.Control type="imageAlt" placeholder="Enter image alt" />
          )}
        </Form.Group> */}

        <Form.Group>
          <Form.Label>Equipment needed</Form.Label>
          {id !== undefined ? (
            <Form.Control
              id="exerciseEquipment"
              type="text"
              defaultValue={exercise.equipment}
            />
          ) : (
            <Form.Control
              id="exerciseEquipment"
              type="text"
              placeholder="Enter required equipment"
            />
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Exercise instructions</Form.Label>
          {id !== undefined ? (
            <Form.Control
              type="text"
              id="exerciseInstructions"
              as="textarea"
              rows={5}
              defaultValue={exercise.instructions}
            />
          ) : (
            <Form.Control
              type="text"
              id="exerciseInstructions"
              as="textarea"
              rows={5}
              placeholder="Enter instructions to complete the exercise. Split into steps by entering a newline."
            />
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

// TODO: Ensure this page can only be accessed if signed in as admin
export default function EditExercise() {
  // Get operation type and exercise ID from query parameters
  const router = useRouter();
  const { id } = router.query;

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

export async function getServerSideProps({ query }) {
  if (query.type !== 'create' && query.type !== 'edit') {
    return {
      redirect: {
        permanent: false,
        destination: '/exercises',
      },
    };
  }

  return {
    props: {},
  };
}
