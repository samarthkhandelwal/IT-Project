// React
import React, { useEffect, useState } from 'react';

// Bootstrap components
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// Next components
import Image from 'next/image';

// Custom components
import List from '../../components/List/List';
import TopNavbar from '../../components/Navbar/Navbar';
import WorkoutList from '../../components/WorkoutList/WorkoutList';

// Styles
import styles from '../../styles/Workouts/Workouts.module.css';

// Authentication
import { useAuth } from '../../context/authUserContext';

export default function WorkoutsPage({ testData }) {
  const [workoutList, setWorkoutList] = useState([]);
  const { authUser } = useAuth();

  const [selectedWorkout, setSelectedWorkout] = useState();
  const [workouts, setWorkouts] = useState([]);

  /* Only render Card if innerWidth > 576px (small breakpoint) */
  const [toRenderCard, setRenderCard] = useState(true);

  useEffect(() => {
    if (testData !== undefined) {
      setWorkouts(testData);
    }

    if (authUser) {
      const createdWorkouts =
        authUser.createdWorkouts !== undefined ? authUser.createdWorkouts : [];
      setWorkouts(createdWorkouts);
      setSelectedWorkout(createdWorkouts[0]);
      setWorkoutList(createdWorkouts);
    }

    if (window.innerWidth < 576) {
      setRenderCard(false);
    }
  }, [authUser, workouts, testData]);

  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* Handles the onClick events for each workout.
   * The split is needed to handle both mobile/desktop views at the same time.
   * If the window width is small, the modal is opened when the elements are
   * clicked. Otherwise, the card is updated.
   */
  const onClick = (newWorkout) => {
    if (!toRenderCard) {
      handleOpen();
    }
    setSelectedWorkout(newWorkout);
  };

  /* When an exercise is deleted, remove it from the list. */
  const onDelete = (id) => {
    setWorkoutList(workouts.filter((doc) => doc.id !== id));
  };

  return (
    <>
      <TopNavbar />

      <Container className={styles.container}>
        <Row>
          {toRenderCard && (
            <Col xs={6}>
              {selectedWorkout != null && (
                <div className={styles.imgcontainer}>
                  <Image
                    src={selectedWorkout.imgSrc}
                    alt={selectedWorkout.imgAlt}
                    width="100%"
                    height="70%"
                    layout="responsive"
                    object-fit="cover"
                    style={{ width: '100%', height: '48vh' }}
                  />
                  <div className={styles.textblock}>
                    <h1>{selectedWorkout.name}</h1>
                    <p>{selectedWorkout.muscleGroups.join(', ')}</p>
                  </div>
                </div>
              )}

              {selectedWorkout != null && (
                <div>
                  <main className={styles.workoutlist}>
                    <WorkoutList exerciseList={selectedWorkout.exercises} />
                  </main>
                </div>
              )}
            </Col>
          )}

          <Col>
            <List
              list={workoutList}
              listType="radio"
              selected={selectedWorkout}
              setSelected={onClick}
              type="user workouts"
              onDelete={onDelete}
            />
          </Col>
        </Row>
      </Container>

      {selectedWorkout !== undefined && (
        <Modal show={isOpen} onHide={handleClose} centered scrollable size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedWorkout.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {selectedWorkout != null && (
              <div>
                <main className={styles.workoutlist}>
                  <WorkoutList exerciseList={selectedWorkout.exercises} />
                </main>
              </div>
            )}
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
