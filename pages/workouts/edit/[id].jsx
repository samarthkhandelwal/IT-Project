// React
import React, { useEffect, useRef, useState } from 'react';

// Next components
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';

// Firebase
import {
  collection,
  updateDoc,
  query,
  orderBy,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../../firebase-config';

// Custom components
import CustomAlert from '../../../components/EditButton/CustomAlert';
import List from '../../../components/List/List';
import TopNavbar from '../../../components/Navbar/Navbar';

// Styles
import styles from '../../../styles/EditButton.module.css';

// Get reference to exercises and workouts collections
const exercisesCollectionRef = collection(db, 'exercises');

function WorkoutForm() {
  const router = useRouter();
  const { id } = router.query;

  /* Ensures that the database is only queried once for data */
  const isFirstLoad = useRef(false);

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

  /* Used to store the ids of exercises that have been added to the workout. */
  const [exerciseGroups, setExerciseGroups] = useState([]);

  /* Used to store a list of the exercises that can be included in the workout */
  const [exercises, setExercises] = useState(undefined);

  /* Stores the current workout being edited. */
  const [workout, setWorkout] = useState({});

  /* Used to store the selected exercise in the 'Add new exercise' modal */
  const [selectedExercise, setSelectedExercise] = useState({});

  useEffect(() => {
    const getExercises = async () => {
      const q = query(exercisesCollectionRef, orderBy('name'));
      const data = await getDocs(q);
      setExercises(data.docs.map((d) => ({ ...d.data(), id: d.id })));
    };

    const getWorkout = async () => {
      const workoutDoc = await getDoc(doc(db, 'workouts', id));
      setWorkout(workoutDoc.data());
    };

    const loadExerciseGroups = () => {
      const newGroups = [];
      if (workout.exercises) {
        for (let i = 0; i < workout.exercises.length; i += 1) {
          newGroups.push({ ...workout.exercises[i], index: i });
        }
      }
      setExerciseGroups(newGroups);
    };

    if (!isFirstLoad.current) {
      getExercises();
      getWorkout();
      isFirstLoad.current = true;
    }

    if (isFirstLoad.current) {
      loadExerciseGroups();
    }
  }, [id, workout.exercises]);

  /* Keeps track of which index the exercise is in the workout */
  const index = useRef(0);

  const updateExercises = (ex) => {
    setExerciseGroups(exerciseGroups.concat(ex));
    setSelectedExercise({});
  };

  const deleteExercise = (toDelete) => {
    const newGroups = exerciseGroups.filter((ex) => ex.index !== toDelete);
    for (let i = 0; i < exerciseGroups.length - 1; i += 1) {
      newGroups[i].index = i;
    }
    setExerciseGroups(newGroups);
    index.current -= 1;
  };

  /* Handles state for the add exercise modal */
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    /* This check is to differentiate between cancelling or actually adding an exercise */
    if (selectedExercise.id) {
      updateExercises({ ...selectedExercise, index: index.current });
      index.current += 1;
    }
    setModalOpen(false);
  };

  /* Transforms an exercise into the correct data structure for the form submission */
  const getRepsSetsMuscles = (values) => {
    const exercisesList = [];
    const muscleGroupsList = [];

    for (let i = 0; i < exerciseGroups.length; i += 1) {
      /* Not sure why, but I can't seem to access the data directly here.
       * So this is a workaround.
       */
      const obj = { ...exerciseGroups[i] };
      delete obj.instructions;
      delete obj.equipment;
      delete obj.videoURL;

      /* Get the muscle groups from the exercise */
      for (let j = 0; j < obj.muscleGroups.length; j += 1) {
        if (!muscleGroupsList.includes(obj.muscleGroups[j])) {
          muscleGroupsList.push(obj.muscleGroups[j]);
        }
      }

      obj.reps = Number(values[`${obj.id}-reps`].value);
      obj.sets = Number(values[`${obj.id}-sets`].value);
      exercisesList.push(obj);
    }

    return [exercisesList, muscleGroupsList.sort()];
  };

  /* Handles the submission of forms. */
  const handleSubmit = async (event) => {
    /* Prevent automatic submission and refreshing of the page. */
    event.preventDefault();

    const [exercisesList, muscleGroups] = getRepsSetsMuscles(event.target);

    /* TODO: Implement muscleGroups and image uploading */
    const data = {
      name: event.target.workoutName.value,
      imgSrc: event.target.workoutImgSrc.value,
      imgAlt: event.target.workoutImgAlt.value,
      muscleGroups,
      exercises: exercisesList,
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

    /* Get the response, add the document, create an alert, then redirect. */
    const result = await response.json();
    if (result.error) {
      handleAlertOpen({
        heading: 'Error',
        body: result.error,
        variant: 'danger',
      });
      return;
    }

    updateDoc(doc(db, 'exercises', id), result.data)
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
      <div style={{ padding: '0 10vw' }}>
        <h2>Editing {workout.name}</h2>
      </div>

      <Form
        onSubmit={handleSubmit}
        action="/api/workout"
        method="post"
        className={styles.form}
      >
        <div className={styles.formname}>
          <Form.Label>Enter workout name:</Form.Label>
          <Form.Control
            id="workoutName"
            type="text"
            defaultValue={workout.name}
          />
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Enter image URL to display</Form.Label>
          <Form.Control
            id="workoutImgSrc"
            type="url"
            defaultValue={workout.imgSrc}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter image alt</Form.Label>
          <Form.Control
            id="workoutImgAlt"
            type="text"
            defaultValue={workout.imgAlt}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Exercises in this workout:</Form.Label>
          <div className={styles.formexercises}>
            {exerciseGroups.length === 0 ? (
              <p>None</p>
            ) : (
              exerciseGroups.map((ex) => (
                <Row className="mb-3" key={ex.index}>
                  <Col xs={5} className="mt-2">
                    {ex.name}
                  </Col>

                  <Col xs={1} className="mt-2">
                    Reps
                  </Col>

                  <Col xs={2}>
                    <Form.Control id={`${ex.id}-reps`} defaultValue={ex.reps} />
                  </Col>

                  <Col xs={1} className="mt-2">
                    Sets
                  </Col>

                  <Col xs={2}>
                    <Form.Control id={`${ex.id}-sets`} defaultValue={ex.sets} />
                  </Col>

                  <Col xs={1} className="mt-2">
                    {/* TODO: Make this tooltip appear next to the image */}
                    <OverlayTrigger
                      overlay={<Tooltip>Delete {ex.name}</Tooltip>}
                    >
                      {({ ref }) => (
                        <Image
                          src="/images/delete.svg"
                          alt={`Delete ${ex.name}`}
                          height={20}
                          width={20}
                          onClick={() => deleteExercise(ex.index)}
                          lazyRoot={ref}
                        />
                      )}
                    </OverlayTrigger>
                  </Col>
                </Row>
              ))
            )}
          </div>
        </Form.Group>

        <div className={styles.formbuttons}>
          <Button variant="primary" onClick={handleModalOpen}>
            Add an exercise
          </Button>
          <div>
            <Link href="/workouts" passHref>
              <Button variant="secondary">Cancel</Button>
            </Link>{' '}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </Form>

      {displayAlert(isAlertActive)}

      <Modal show={isModalOpen} onHide={handleModalClose} centered size="lg">
        <Modal.Header>
          <Modal.Title>
            <p>Add an exercise</p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {exercises && (
            <List
              list={exercises}
              listType="radio"
              type="exercises"
              setSelected={setSelectedExercise}
            />
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>

          <Button variant="primary" onClick={handleModalClose}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default function CreateWorkout() {
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
