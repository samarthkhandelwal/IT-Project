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
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase-config';

// Custom components
import CustomAlert from '../../../components/EditButton/CustomAlert';
import TopNavbar from '../../../components/Navbar/Navbar';

// Styles
import styles from '../../../styles/EditButton.module.css';

// Get muscle list
import muscles from '../../../public/muscles.json' assert { type: 'json' };

// Authentication
import { useAuth } from '../../../context/authUserContext';

// Get reference to workouts collection
const exercisesCollectionRef = collection(db, 'exercises');

// A form used for both creating and editing exercises
function ExerciseForm() {
  const { authUser } = useAuth();

  /* Handles the state of the checkboxes */
  const [checkboxes, setCheckboxes] = useState([]);

  /* Handles state for the alert */
  const [isAlertActive, setAlertActive] = useState({});
  const handleAlertOpen = ({ heading, body, variant }) => {
    setAlertActive({ heading, body, variant });
  };
  const handleAlertClose = () => {
    setAlertActive({});
  };

  /* Used to manage the list of chosen muscle groups in the form */
  const [chosenMuscleGroups, setChosenMuscleGroups] = useState([]);

  /* Ensures that the database is only queried once for data */
  const isFirstLoad = useRef(false);

  /* Use Router for automatic redirect after successful form submission */
  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      router.push('/exercises');
    }

    const updateChosenMuscles = (ex) => {
      if (chosenMuscleGroups.includes(ex.target.value)) {
        const filtered = chosenMuscleGroups.filter(
          (i) => i !== ex.target.value
        );
        setChosenMuscleGroups(filtered);
      } else {
        chosenMuscleGroups.push(ex.target.value);
        setChosenMuscleGroups(chosenMuscleGroups);
      }
    };

    const makeCheckboxes = () => {
      const checkboxColumns = [];
      for (let i = 0; i < muscles.length; i += 1) {
        const { group, musclesList } = muscles[i];
        const boxes = [];
        for (let j = 0; j < musclesList.length; j += 1) {
          const { mId, name } = musclesList[j];
          boxes.push(
            <div className="mb-3" key={mId}>
              <Form.Check
                type="checkbox"
                id="exerciseMuscleGroups"
                value={name}
                label={name}
                key={`${mId}-${name}`}
                onChange={updateChosenMuscles}
              />
            </div>
          );
        }
        checkboxColumns.push(
          <Col key={group}>
            <b>{group}</b>
            {boxes}
          </Col>
        );
      }
      return checkboxColumns;
    };

    if (!isFirstLoad.current) {
      setCheckboxes(makeCheckboxes);
      isFirstLoad.current = true;
    }
  }, [authUser, chosenMuscleGroups, router]);

  /* Handles the submission of forms. */
  const handleSubmit = async (event) => {
    /* Prevent automatic submission and refreshing of the page. */
    event.preventDefault();

    const data = {
      name: event.target.exerciseName.value,
      videoURL: event.target.exerciseURL.value,
      instructions: event.target.exerciseInstructions.value,
      equipment: event.target.exerciseEquipment.value,
      imgSrc: event.target.exerciseImgSrc.value,
      imgAlt: event.target.exerciseImgAlt.value,
      muscleGroups: chosenMuscleGroups,
    };

    /* Send the form data to the API and get a response */
    const response = await fetch('/api/exercise', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    /* Get the response, add the document, create an alert, then redirect. */
    const result = await response.json();
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
      <h2>Creating new exercise</h2>

      <Form onSubmit={handleSubmit} action="/api/exercise" method="post">
        <Form.Group>
          <Form.Label>Exercise name</Form.Label>
          <Form.Control
            id="exerciseName"
            type="text"
            placeholder="Enter exercise name"
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
            placeholder="Enter video URL"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Enter image URL to display</Form.Label>
          <Form.Control
            id="exerciseImgSrc"
            type="url"
            placeholder="Enter image URL"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Enter image alt</Form.Label>
          <Form.Control
            id="exerciseImgAlt"
            type="text"
            placeholder="Enter image alt (in case the image doesn't load)"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Equipment needed</Form.Label>
          <Form.Control
            id="exerciseEquipment"
            type="text"
            placeholder="Enter required equipment (leave blank for nothing)."
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Exercise instructions</Form.Label>
          <Form.Control
            type="text"
            id="exerciseInstructions"
            as="textarea"
            rows={5}
            placeholder="Enter instructions to complete the exercise."
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

export default function CreateExercise() {
  return (
    <>
      <TopNavbar />
      <div className={styles.main}>
        <ExerciseForm />
      </div>
    </>
  );
}
