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
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase-config';

// Custom components
import CustomAlert from '../../../components/EditButton/CustomAlert';
import TopNavbar from '../../../components/Navbar/Navbar';

// Styles
import styles from '../../../styles/EditButton.module.css';

// Get muscle list
import muscles from '../../../public/muscles.json' assert { type: 'json' };

// A form used for both creating and editing exercises
function ExerciseForm() {
  /* Get exercise ID from query parameters */
  const router = useRouter();
  const { id } = router.query;

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

  /* Ensures that the database is only queried once for data */
  const isFirstLoad = useRef(false);

  useEffect(() => {
    const getExercise = async () => {
      if (router.isReady) {
        const exerciseDoc = await getDoc(doc(db, 'exercises', id));
        if (exerciseDoc.exists()) {
          chosenMuscleGroups.current = exerciseDoc.data().muscleGroups;
          setExercise(exerciseDoc.data());
        }
      }
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

    const makeCheckboxes = () => {
      const checkboxColumns = [];
      // Create checkboxes for all muscles, and pre-check boxes
      const preChecked =
        exercise.muscleGroups !== undefined ? exercise.muscleGroups : [];
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
                  id="exerciseMuscleGroups"
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
                  id="exerciseMuscleGroups"
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

    if (!isFirstLoad.current || exercise !== undefined) {
      getExercise();
      isFirstLoad.current = true;
    }

    if (isFirstLoad.current) {
      setCheckboxes(makeCheckboxes());
    }
  }, [exercise, id, router.isReady]);

  /* Handles the submission of forms. */
  const handleSubmit = async (event) => {
    /* Prevent automatic submission and refreshing of the page. */
    event.preventDefault();

    /* TODO: Implement image uploading */
    const data = {
      name: event.target.exerciseName.value,
      videoURL: event.target.exerciseURL.value,
      instructions: event.target.exerciseInstructions.value,
      equipment: event.target.exerciseEquipment.value,
      imgSrc: event.target.exerciseImgSrc.value,
      imgAlt: event.target.exerciseImgAlt.value,
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

    /* Get the response, update the document, create an alert, then redirect. */
    const result = await response.json();
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

  return (
    <div className={styles.form}>
      <h2>Editing {exercise.name}</h2>

      <Form onSubmit={handleSubmit} action="/api/exercise" method="post">
        <Form.Group>
          <Form.Label>Exercise name</Form.Label>
          <Form.Control
            id="exerciseName"
            type="text"
            defaultValue={exercise.name}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Select targeted areas</Form.Label>
          <Container fluid>
            <Row>{checkboxes}</Row>
          </Container>
        </Form.Group>

        <Form.Group>
          <Form.Label>Enter video url to display</Form.Label>
          <Form.Control
            id="exerciseURL"
            type="url"
            defaultValue={exercise.videoURL}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Enter image URL to display</Form.Label>
          <Form.Control
            id="exerciseImgSrc"
            type="url"
            defaultValue={exercise.imgSrc}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Enter image alt</Form.Label>
          <Form.Control
            id="exerciseImgAlt"
            type="text"
            defaultValue={exercise.imgAlt}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Equipment needed</Form.Label>
          <Form.Control
            id="exerciseEquipment"
            type="text"
            defaultValue={exercise.equipment}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Exercise instructions</Form.Label>
          <Form.Control
            type="text"
            id="exerciseInstructions"
            as="textarea"
            rows={5}
            defaultValue={exercise.instructions}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {displayAlert(isAlertActive)}
    </div>
  );
}

export default function EditExercise() {
  return (
    <>
      <TopNavbar />
      {/* TODO: Preview of changes on side. */}
      <div className={styles.main}>
        <ExerciseForm />
      </div>
    </>
  );
}
