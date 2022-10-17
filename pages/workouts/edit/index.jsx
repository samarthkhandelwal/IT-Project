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
import {
  getDoc,
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../../firebase-config';

// Custom components
import TopNavbar from '../../../components/Navbar/Navbar';

// Styles
import styles from '../../../styles/Crud.module.css';

// Get muscle list
import muscles from '../../../public/muscles.json' assert { type: 'json' };

// Get reference to exercises and workouts collections
const workoutsCollectionRef = collection(db, 'workouts');
const exercisesCollectionRef = collection(db, 'exercises');

// A form used for both creating and editing workouts
function WorkoutForm({ id }) {
  const isEditingForm = id !== undefined;

  /* Ensures that the Firestore is only contacted once for data */
  const [isDataReceived, setDataReceived] = useState(false);

  /* Handles state for the workout */
  const [workout, setWorkout] = useState({});

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

  /* Used to manage the list of chosen exercises in the form */
  const chosenExercises = useRef([]);

  /* Used to manage the list of chosen muscle groups in the form */
  const chosenMuscleGroups = useRef([]);

  /* Used to get a list of checkboxes for exercises to choose for a workout */
  const [exerciseOptions, setExerciseOptions] = useState([]);

  /* Used to ensure that the exercises collection is queried only once */
  const [isExercisesReceived, setExercisesReceived] = useState(false);
  const [exercises, setExercises] = useState(undefined);

  /* Use Router for automatic redirect after successful form submission */
  const router = useRouter();

  useEffect(() => {
    const getWorkout = async () => {
      if (isEditingForm) {
        const workoutDoc = await getDoc(doc(db, 'workouts', id));
        chosenExercises.current = workoutDoc.data().exercises;
        chosenMuscleGroups.current = workoutDoc.data().muscleGroups;
        setWorkout(workoutDoc.data());
      }
    };

    const getExercises = async () => {
      const q = query(exercisesCollectionRef, orderBy('name'));
      const data = await getDocs(q);
      setExercises(data);
    };

    if (!isDataReceived) {
      getWorkout();
    }

    if (!isExercisesReceived) {
      getExercises();
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
        workout.muscleGroups !== undefined ? workout.muscleGroups : [];
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
                  id="workoutMuscleGroups"
                  value={name}
                  label={name}
                  key={name}
                  defaultChecked
                  onChange={updateChosenMuscles}
                />
              ) : (
                <Form.Check
                  type="checkbox"
                  id="workoutMuscleGroups"
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

    const updateChosenExercises = (ex) => {
      if (chosenExercises.current.includes(ex.target.value)) {
        const filtered = chosenExercises.current.filter(
          (i) => i !== ex.target.value
        );
        chosenExercises.current = filtered;
      } else {
        chosenExercises.current.push(ex.target.value);
      }
    };

    const makeExerciseOptions = async () => {
      if (exercises !== undefined) {
        const preChecked =
          workout.exercises !== undefined ? workout.exercises : [];
        setExerciseOptions(
          exercises.docs.map((document) => (
            <div className="mb-3" key={document.id}>
              {preChecked.includes(document.id) ? (
                <Form.Check
                  type="checkbox"
                  id="chosenOptions"
                  value={document.id}
                  label={document.data().name}
                  key={document.data().name}
                  onChange={updateChosenExercises}
                  defaultChecked
                />
              ) : (
                <Form.Check
                  type="checkbox"
                  id="chosenOptions"
                  value={document.id}
                  label={document.data().name}
                  key={document.data().name}
                  onChange={updateChosenExercises}
                />
              )}
            </div>
          ))
        );
      }
    };

    if (isDataReceived) {
      setCheckboxes(makeCheckboxes);
    }

    if (isExercisesReceived) {
      makeExerciseOptions();
    }

    return () => {
      setDataReceived(true);
      setExercisesReceived(true);
    };
  }, [
    id,
    workout,
    router,
    isEditingForm,
    isDataReceived,
    isExercisesReceived,
    exercises,
  ]);

  /* Handles the submission of forms. */
  const handleSubmit = async (event) => {
    /* Prevent automatic submission and refreshing of the page. */
    event.preventDefault();

    /* TODO: Implement muscleGroups and image uploading */
    const data = {
      name: event.target.workoutName.value,
      imageSource: '/images/push-ups.png',
      imageAlt: `Picture of ${event.target.workoutName.value}`,
      muscleGroups: chosenMuscleGroups.current,
      exercises: chosenExercises.current,
      id,
    };

    /* Send the form data to the API and get a response */
    const response = await fetch('/api/workout', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    /* Get the response, update/add the document, create an alert, then redirect. */
    const result = await response.json();
    if (isEditingForm) {
      updateDoc(doc(db, 'workouts', id), result.data)
        .then(() => {
          handleAlertOpen({
            heading: 'Success!',
            body: `${result.data.name} was updated in the workout list. Redirecting...`,
            variant: 'success',
          });
          setTimeout(() => {
            router.push('/workouts');
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
      addDoc(workoutsCollectionRef, result.data)
        .then(() => {
          handleAlertOpen({
            heading: 'Success!',
            body: `${result.data.name} was added to the workout list. Redirecting...`,
            variant: 'success',
          });
          setTimeout(() => {
            router.push('/workouts');
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
        {isEditingForm ? `Editing '${workout.name}'` : 'Creating new workout'}
      </h2>

      <Form onSubmit={handleSubmit} action="/api/workout" method="post">
        <Form.Group>
          <Form.Label>Workout name</Form.Label>
          {isEditingForm ? (
            <Form.Control
              id="workoutName"
              type="text"
              defaultValue={workout.name}
            />
          ) : (
            <Form.Control
              id="workoutName"
              type="text"
              placeholder="Enter workout name"
            />
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Select targeted areas</Form.Label>
          <Container fluid>
            <Row>{checkboxes}</Row>
          </Container>
        </Form.Group>

        {/* Not going to work just yet */}
        {/* <Form.Group controlId="formThumbnail">
          <Form.Label>Select a thumbnail</Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <Form.Group controlId="formImageAlt">
          <Form.Label>Enter text to show if image doesn&apos;t load</Form.Label>
          {isEditingForm ? (
            <Form.Control type="imageAlt" defaultValue={workout.imageAlt} />
          ) : (
            <Form.Control type="imageAlt" placeholder="Enter image alt" />
          )}
        </Form.Group> */}

        <Form.Group>
          <Form.Label>Select exercises to include</Form.Label>
          {exerciseOptions}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

// TODO: Ensure this page can only be accessed if signed in as admin
export default function EditWorkout() {
  // Get operation type and workout ID from query parameters
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <TopNavbar />
      {/* TODO: Preview of changes on side. */}
      <div className={styles.main}>
        {id !== undefined ? <WorkoutForm id={id} /> : <WorkoutForm />}
      </div>
    </>
  );
}

export async function getServerSideProps({ query: urlQuery }) {
  if (urlQuery.type !== 'create' && urlQuery.type !== 'edit') {
    return {
      redirect: {
        permanent: false,
        destination: '/workouts',
      },
    };
  }

  return {
    props: {},
  };
}
