// React
import React, { useState, useEffect } from 'react';

// Next
import Head from 'next/head';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

// Firebase
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase-config';

// Custom Components
import List from '../../components/List/List';
import TopNavbar from '../../components/Navbar/Navbar';
import Video from '../../components/Video/Video';

// Styles
import styles from '../../styles/List.module.css';

// Authentication
import { useAuth } from '../../context/authUserContext';

// Get reference to exercises collection
const exercisesCollectionRef = collection(db, 'exercises');

export default function ExercisesPage() {
  /* Get exercises from the database */
  const [exerciseList, setExerciseList] = useState([]);

  /* Manage state for the selected exercise */
  const [selectedExercise, setSelectedExercise] = useState(undefined);

  /* Authenticate users for favourites */
  const { authUser } = useAuth();

  /* Used to keep state of exercises from the database */
  const [exercises, setExercises] = useState([]);

  /* Used to ensure the database is only accessed once */
  const [isExercisesLoaded, setExercisesLoaded] = useState(false);

  /* Only render Card if innerWidth > 576px (small breakpoint) */
  const [toRenderCard, setRenderCard] = useState(true);
  useEffect(() => {
    const getExercises = async () => {
      const q = query(exercisesCollectionRef, orderBy('name'), limit(10));
      const data = await getDocs(q);
      setExercises(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    if (!isExercisesLoaded) {
      getExercises();
    }

    /* Get the user's favourites to bump them to the top of the exercise list */
    if (isExercisesLoaded) {
      if (authUser) {
        const favs = exercises.filter((doc) =>
          authUser.favouriteExercises.includes(doc.id)
        );
        const unfavs = exercises.filter(
          (doc) => !authUser.favouriteExercises.includes(doc.id)
        );

        const finalList = favs.concat(unfavs);
        setSelectedExercise(finalList[0]);
        setExerciseList(finalList);
      } else {
        setSelectedExercise(exercises[0]);
        setExerciseList(exercises);
      }
    }

    const getSelected = () => {
      if (selectedExercise !== undefined) {
        exerciseList.forEach((doc) => {
          if (doc.id === selectedExercise) {
            setSelectedExercise(doc);
          }
        });
      }
    };

    getSelected();

    if (window.innerWidth < 576) {
      setRenderCard(false);
    }

    return () => {
      setExercisesLoaded(true);
    };
  }, [authUser, selectedExercise, exerciseList, isExercisesLoaded, exercises]);

  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* Handles the onClick events for each exercise.
   * The split is needed to handle both mobile/desktop views at the same time.
   * If the window width is small, the modal is opened when the elements are
   * clicked. Otherwise, the card is updated.
   */
  const onClick = () => {
    if (!toRenderCard) {
      handleOpen();
    } else {
      setSelectedExercise(selectedExercise.id);
    }
  };

  return (
    <>
      <TopNavbar />
      <Row className={styles.container}>
        {toRenderCard ? (
          selectedExercise !== undefined && (
            <Col xs={6} className={styles.scrollableContainer}>
              <h2>{selectedExercise.name}</h2>
              <Video
                videoURL={selectedExercise.videoURL}
                titleAlt={`${selectedExercise.name} Video`}
              />
              <h5>
                Equipment required:{' '}
                {selectedExercise.equipment !== undefined
                  ? selectedExercise.equipment
                  : 'None'}
              </h5>

              <h5>Instructions:</h5>
              {selectedExercise.instructions}
            </Col>
          )
        ) : (
          <Col xs={6} />
        )}

        <Col>
          <List
            list={exerciseList}
            listType="radio"
            selected={selectedExercise}
            setSelected={setSelectedExercise}
            type="exercises"
            onClick={onClick}
          />
        </Col>
      </Row>

      {selectedExercise !== undefined && (
        <Modal show={isOpen} onHide={handleClose} centered scrollable size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedExercise.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Video
              videoURL={selectedExercise.videoURL}
              titleAlt={`${selectedExercise.name} Video`}
            />
            {selectedExercise.instructions}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
