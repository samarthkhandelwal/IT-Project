// React
import React, { useEffect, useRef, useState } from 'react';

// Next components
import { useRouter } from 'next/router';

// Bootstrap components
import Alert from 'react-bootstrap/Alert';
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
import muscles from '../../../public/muscles.json' assert { type: 'json' };

// Get reference to workouts collection
const exercisesCollectionRef = collection(db, 'exercises');

// A form used for both creating and editing exercises
function ExerciseForm({ id }) {
  const isEditingForm = id !== undefined;

  /* Handles state for the exercise */
  const [exercise, setExercise] = useState({});

  /* Handles state for the checkboxes */
  const [checkboxes, setCheckboxes] = useState([]);

  /* Handles state for validation of form */
  // TODO: Form validation
  // const [validated, setValidated] = useState(false);

  /* Handles state for the alert */
  const [isAlertActive, setAlertActive] = useState({});
  const handleAlertOpen = ({ heading, body, variant }) => {
    setAlertActive({ heading, body, variant });
  };
  const handleAlertClose = () => {
    setAlertActive({});
  };

  /* Used to manage the list of chosen muscle groups in the form */
  const chosenMuscleGroups = useRef([]);

  /* Used to ensure that the exercises collection is queried only once */
  const [isExercisesReceived, setExercisesReceived] = useState(false);

  /* Use Router for automatic redirect after successful form submission */
  const router = useRouter();

  useEffect(() => {
    const getExercise = async () => {
      if (isEditingForm) {
        const exerciseDoc = await getDoc(doc(db, 'exercises', id));
        chosenMuscleGroups.current = exerciseDoc.data().muscleGroups;
        setExercise(exerciseDoc.data());
      }
    };

    if (!isExercisesReceived) {
      getExercise();
    }

    const updateChosenMuscles = (ex) => {
      if (chosenMuscleGroups.current.includes(ex.target.value)) {
        const filtered = chosenMuscleGroups.current.filter(
          (i) => i !== ex.target.value
        );
        chosenMuscleGroups.current = filtered;
      } else {
        chosenMuscleGroups.current.push(ex.target.value);
      }
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
                  onChange={updateChosenMuscles}
                />
              ) : (
                <Form.Check
                  type="checkbox"
                  id="exerciseMuscleGroups"
                  value={name}
                  label={name}
                  key={name}
                  onChange={updateChosenMuscles}
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

    if (isExercisesReceived) {
      setCheckboxes(makeCheckboxes);
    }

    return () => {
      setExercisesReceived(true);
    };
  }, [id, exercise.muscleGroups, router, isEditingForm, isExercisesReceived]);

  /* Handles the submission of forms. */
  const handleSubmit = async (event) => {
    /* Prevent automatic submission and refreshing of the page. */
    event.preventDefault();

    /* TODO: Implement muscleGroups and image uploading */
    const data = {
      name: event.target.exerciseName.value,
      videoURL: event.target.exerciseURL.value,
      instructions: event.target.exerciseInstructions.value,
      equipment: event.target.exerciseEquipment.value,
      imageSource: '/images/hammer-curls.png',
      imageAlt: `Picture of ${event.target.exerciseName.value}`,
      muscleGroups: chosenMuscleGroups.current,
    };

    /* Send the form data to the API and get a response */
    const response = await fetch('/api/exercise', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    /* Get the response, update/add the document, create an alert, then redirect. */
    const result = await response.json();
    if (isEditingForm) {
      updateDoc(doc(db, 'exercises', id), result.data)
        .then(() => {
          handleAlertOpen({
            heading: 'Success!',
            body: `${result.data.name} was updated in the exercise list. Redirecting...`,
            variant: 'success',
          });
          setTimeout(() => {
            router.push('/exercises');
          }, 3000);
        })
        .catch((error) => {
          handleAlertOpen({
            heading: 'Error',
            body: error,
            variant: 'danger',
          });
        });
    } else {
      addDoc(exercisesCollectionRef, result.data)
        .then(() => {
          handleAlertOpen({
            heading: 'Success!',
            body: `${result.data.name} was added to the exercise list. Redirecting...`,
            variant: 'success',
          });
          setTimeout(() => {
            router.push('/exercises');
          }, 3000);
        })
        .catch((error) => {
          handleAlertOpen({
            heading: 'Error',
            body: error,
            variant: 'danger',
          });
        });
    }
  };

  const displayAlert = ({ heading, body, variant }) => {
    if (heading !== undefined) {
      return (
        <Alert variant={variant} onClose={handleAlertClose} dismissible>
          <Alert.Heading>{heading}</Alert.Heading>
          <p>{body}</p>
        </Alert>
      );
    }
    return null;
  };

  return (
    <div className={styles.form}>
      {displayAlert(isAlertActive)}

      <h2>
        {isEditingForm ? `Editing '${exercise.name}'` : 'Creating new exercise'}
      </h2>

      <Form onSubmit={handleSubmit} action="/api/exercise" method="post">
        <Form.Group>
          <Form.Label>Exercise name</Form.Label>
          {isEditingForm ? (
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
          {isEditingForm ? (
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
          {isEditingForm ? (
            <Form.Control type="imageAlt" defaultValue={exercise.imageAlt} />
          ) : (
            <Form.Control type="imageAlt" placeholder="Enter image alt" />
          )}
        </Form.Group> */}

        <Form.Group>
          <Form.Label>Equipment needed</Form.Label>
          {isEditingForm ? (
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
          {isEditingForm ? (
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
