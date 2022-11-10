// React
import React, { useEffect, useRef, useState } from 'react';

// Next components
import Link from 'next/link';
import { useRouter } from 'next/router';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Firebase
import {
  collection,
  updateDoc,
  query,
  orderBy,
  getDocs,
  doc,
} from 'firebase/firestore';
import { db } from '../../../firebase-config';

// Custom components
import AddExerciseModal from '../../../components/WorkoutForms/AddExerciseModal';
import CustomAlert from '../../../components/EditButton/CustomAlert';
import EditExerciseModal from '../../../components/WorkoutForms/EditExerciseModal';
import ExerciseElement from '../../../components/WorkoutForms/ExerciseElement';
import TopNavbar from '../../../components/Navbar/Navbar';

// Styles
import styles from '../../../styles/WorkoutForms/WorkoutForm.module.css';

// Authentication
import { useAuth } from '../../../context/authUserContext';

// Get reference to exercises and workouts collections
const exercisesCollectionRef = collection(db, 'exercises');

function WorkoutForm() {
  const router = useRouter();
  const { id } = router.query;
  const { authUser } = useAuth();

  /* Ensures that the database is only queried once for data */
  const isFirstLoad = useRef(false);

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

  /* Keeps track of which index the exercise is in the workout */
  const index = useRef(0);

  useEffect(() => {
    if (!authUser) {
      router.push('/workouts');
    }

    const getExercises = async () => {
      const q = query(exercisesCollectionRef, orderBy('name'));
      const data = await getDocs(q);
      setExercises(data.docs.map((d) => ({ ...d.data(), id: d.id })));
    };

    const getWorkout = () => {
      if (authUser) {
        for (let i = 0; i < authUser.createdWorkouts.length; i += 1) {
          if (authUser.createdWorkouts[i].id === id) {
            setWorkout(authUser.createdWorkouts[i]);
            break;
          }
        }
      }
    };

    const loadExerciseGroups = () => {
      const newGroups = [];
      if (workout.exercises) {
        for (let i = 0; i < workout.exercises.length; i += 1) {
          newGroups.push({ ...workout.exercises[i], index: i });
        }
        index.current = workout.exercises.length;
      }
      setExerciseGroups(newGroups);
    };

    if (!isFirstLoad.current) {
      getExercises();
      isFirstLoad.current = true;
    }

    if (isFirstLoad.current) {
      getWorkout();
      loadExerciseGroups();
    }
  }, [authUser, id, router, workout.exercises]);

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
  const [isAddExerciseModalOpen, setAddExerciseModalOpen] = useState(false);
  const handleAddExerciseModalOpen = () => setAddExerciseModalOpen(true);
  const handleAddExerciseModalClose = () => {
    /* This check is to differentiate between cancelling or actually adding an exercise */
    if (selectedExercise.id) {
      updateExercises({
        ...selectedExercise,
        index: index.current,
        sets: 0,
        reps: 0,
      });
      index.current += 1;
    }
    setAddExerciseModalOpen(false);
  };

  /* Handles state for the editing sets/reps for an exercise modal */
  const [isEditExerciseModalOpen, setEditExerciseModalOpen] = useState(false);
  const handleEditExerciseModalOpen = (ex) => {
    setSelectedExercise(ex);
    setEditExerciseModalOpen(true);
  };
  const handleEditExerciseModalClose = () => {
    for (let i = 0; i < exerciseGroups.length; i += 1) {
      if (exerciseGroups[i].id === selectedExercise.id) {
        exerciseGroups[i].sets = selectedExercise.sets;
        exerciseGroups[i].reps = selectedExercise.reps;
        break;
      }
    }
    setExerciseGroups(exerciseGroups);
    setEditExerciseModalOpen(false);
  };

  /* Transforms an exercise into the correct data structure for the form submission */
  const getRepsSetsMuscles = () => {
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
      delete obj.index;
      delete obj.muscleGroups;

      /* Get the muscle groups from the exercises */
      if (exercises) {
        for (let j = 0; j < exercises.length; j += 1) {
          if (exercises[j].id === obj.id) {
            for (let k = 0; k < exercises[j].muscleGroups.length; k += 1) {
              if (!muscleGroupsList.includes(exercises[j].muscleGroups[k])) {
                muscleGroupsList.push(exercises[j].muscleGroups[k]);
              }
            }
            break;
          }
        }
      }

      exercisesList.push(obj);
    }

    return [exercisesList, muscleGroupsList.sort()];
  };

  /* Handles the submission of forms. */
  const handleSubmit = async (event) => {
    /* Prevent automatic submission and refreshing of the page. */
    event.preventDefault();

    const [exercisesList, muscleGroups] = getRepsSetsMuscles();

    const data = {
      name: event.target.workoutName.value,
      imgSrc: event.target.workoutImgSrc.value,
      imgAlt: event.target.workoutImgAlt.value,
      muscleGroups,
      exercises: exercisesList,
      id: `${authUser.uid}-${event.target.workoutName.value}`,
    };

    /* Send the form data to the API and get a response */
    const response = await fetch('/api/userworkout', {
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

    for (let i = 0; i < authUser.createdWorkouts.length; i += 1) {
      if (authUser.createdWorkouts[i].id === result.data.id) {
        authUser.createdWorkouts[i] = { ...result.data };
        break;
      }
    }

    if (authUser) {
      updateDoc(doc(db, 'users', authUser.uid), {
        createdWorkouts: authUser.createdWorkouts,
      })
        .then(() => {
          handleAlertOpen({
            heading: 'Success!',
            body: `${result.data.name} was updated in your workout list. Redirecting...`,
            variant: 'success',
          });
          setTimeout(() => {
            router.push('/userworkouts');
          }, 3000);
        })
        .catch((error) => {
          handleAlertOpen({
            heading: 'Error',
            body: `${error.name}: ${error.code}`,
            variant: 'danger',
          });
        });
    }
  };

  const displayAlert = ({ heading, body, variant }) => {
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

  /* Handles the submission of forms to edit sets/reps of an exercise */
  const handleEdit = (event) => {
    event.preventDefault();
    selectedExercise.sets = event.target.newsets.value;
    selectedExercise.reps = event.target.newreps.value;
    handleEditExerciseModalClose();
  };

  return (
    <div className={styles.form}>
      <div>
        <h2>Editing {workout.name}</h2>
      </div>

      <Form onSubmit={handleSubmit} action="/apiwout" method="post">
        <div className="mt-3 mb-3">
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
                <ExerciseElement
                  exercise={ex}
                  key={ex.id}
                  onClick={() => {
                    handleEditExerciseModalOpen(ex);
                  }}
                />
              ))
            )}
          </div>
        </Form.Group>

        <div className={styles.addexercise}>
          <Button
            variant="outline-primary"
            onClick={handleAddExerciseModalOpen}
            className="mt-3 mb-3"
          >
            + Add an exercise
          </Button>
        </div>

        {displayAlert(isAlertActive)}

        <div className={`mt-3 ${styles.buttongroup}`}>
          <Link href="/userworkouts" passHref>
            <Button variant="secondary" size="lg">
              Cancel
            </Button>
          </Link>
          <Button variant="primary" type="submit" size="lg">
            Submit
          </Button>
        </div>
      </Form>

      <AddExerciseModal
        show={isAddExerciseModalOpen}
        onClose={handleAddExerciseModalClose}
        list={exercises}
        setSelectedExercise={setSelectedExercise}
      />

      <EditExerciseModal
        show={isEditExerciseModalOpen}
        onClose={handleEditExerciseModalClose}
        exercise={selectedExercise}
        onSubmit={handleEdit}
        onDelete={() => {
          deleteExercise(selectedExercise.index);
          setEditExerciseModalOpen(false);
        }}
      />
    </div>
  );
}

export default function CreateWorkout() {
  return (
    <>
      <TopNavbar />
      <div className={styles.main}>
        <WorkoutForm />
      </div>
    </>
  );
}
