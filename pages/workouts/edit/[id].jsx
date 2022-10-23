// React
import React, { useEffect, useRef, useState } from 'react';

// Next components
import { useRouter } from 'next/router';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// Firebase
import {
  getDoc,
  collection,
  updateDoc,
  doc,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../../firebase-config';

// Custom components
import CustomAlert from '../../../components/EditButton/CustomAlert';
import TopNavbar from '../../../components/Navbar/Navbar';

// Styles
import styles from '../../../styles/EditButton.module.css';

// Get muscle list
import muscles from '../../../public/muscles.json' assert { type: 'json' };

// Get reference to exercises and workouts collections
const exercisesCollectionRef = collection(db, 'exercises');

function WorkoutForm() {
  const router = useRouter();
  const { id } = router.query;

  /* Ensures that the Firestore is only contacted once for data */
  const isFirstLoad = useRef(false);

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
  const [exercises, setExercises] = useState(undefined);

  useEffect(() => {
    const getWorkout = async () => {
      const workoutDoc = await getDoc(doc(db, 'workouts', id));
      chosenExercises.current = workoutDoc.data().exercises;
      chosenMuscleGroups.current = workoutDoc.data().muscleGroups;
      setWorkout(workoutDoc.data());
    };

    const getExercises = async () => {
      const q = query(exercisesCollectionRef, orderBy('name'));
      const data = await getDocs(q);
      setExercises(data);
    };

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

    const makeCheckboxes = () => {
      const checkboxColumns = [];
      // Create checkboxes for all muscles, and pre-check boxes
      const preChecked =
        workout.muscleGroups !== undefined ? workout.muscleGroups : [];
      for (let i = 0; i < muscles.length; i += 1) {
        const { group, musclesList } = muscles[i];
        const boxes = [];
        for (let j = 0; j < musclesList.length; j += 1) {
          const { mId, name } = musclesList[j];
          if (preChecked.includes(name)) {
            boxes.push(
              <div className="mb-3" key={mId}>
                <Form.Check
                  type="checkbox"
                  id="workoutMuscleGroups"
                  value={name}
                  label={name}
                  key={name}
                  defaultChecked
                  onChange={updateChosenMuscles}
                />
              </div>
            );
          } else {
            boxes.push(
              <div className="mb-3" key={mId}>
                <Form.Check
                  type="checkbox"
                  id="workoutMuscleGroups"
                  value={name}
                  label={name}
                  key={name}
                  onChange={updateChosenMuscles}
                />
              </div>
            );
          }
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

    const makeExerciseOptions = () => {
      if (exercises !== undefined) {
        const preChecked =
          workout.exercises !== undefined ? workout.exercises : [];
        return exercises.docs.map((document) => (
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
        ));
      }
      return null;
    };

    if (!isFirstLoad.current) {
      getExercises();
      getWorkout();
      isFirstLoad.current = true;
    }

    if (isFirstLoad.current) {
      setCheckboxes(makeCheckboxes());
      setExerciseOptions(makeExerciseOptions());
    }
  }, [exercises, id, workout.exercises, workout.muscleGroups]);

  /* Handles the submission of forms. */
  const handleSubmit = async (event) => {
    /* Prevent automatic submission and refreshing of the page. */
    event.preventDefault();

    /* TODO: Implement muscleGroups and image uploading */
    const data = {
      name: event.target.workoutName.value,
      imgSrc: '/images/push-ups.png',
      imgAlt: `Picture of ${event.target.workoutName.value}`,
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

    /* Get the response, update the document, create an alert, then redirect. */
    const result = await response.json();
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
  };

  const displayAlert = ({ heading, body, variant }) => {
    // TODO: Check if dismissible on error
    if (heading && body && variant) {
      return (
        <CustomAlert
          heading={heading}
          body={body}
          variant={variant}
          onClose={handleAlertClose}
        />
      );
    }
    return null;
  };

  return (
    <div className={styles.form}>
      <h2>{`Editing '${workout.name}'`}</h2>

      <Form onSubmit={handleSubmit} action="/api/workout" method="post">
        <Form.Group>
          <Form.Label>Workout name</Form.Label>
          <Form.Control
            id="workoutName"
            type="text"
            defaultValue={workout.name}
          />
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

        <Form.Group controlId="formimgAlt">
          <Form.Label>Enter text to show if image doesn't load</Form.Label>
          <Form.Control type="imgAlt" defaultValue={workout.imgAlt} />
        </Form.Group> */}

        <Form.Group>
          <Form.Label>Select exercises to include</Form.Label>
          {exerciseOptions}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {displayAlert(isAlertActive)}
    </div>
  );
}

export default function EditWorkout() {
  return (
    <>
      <TopNavbar />
      {/* TODO: Preview of changes on side. */}
      <div className={styles.main}>
        <WorkoutForm />
      </div>
    </>
  );
}
