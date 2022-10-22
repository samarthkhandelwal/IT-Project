// React
import React, { useEffect, useState } from 'react';

// Next
import Head from 'next/head';

// Bootstrap components
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// Next components
import Image from 'next/image';

// Firebase
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase-config';

// Custom components
import List from '../../components/List/List';
import TopNavbar from '../../components/Navbar/Navbar';
import WorkoutList from '../../components/WorkoutList/WorkoutList';

// Styles
import styles from '../../styles/Workouts/Workouts.module.css';

// Authentication
import { useAuth } from '../../context/authUserContext';

// Get reference to workouts collection
const workoutsCollectionRef = collection(db, 'workouts');

export default function WorkoutsPage() {
  const [workoutList, setWorkoutList] = useState([]);
  const { authUser } = useAuth();

  const [selected, setSelected] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState();
  const [workouts, setWorkouts] = useState([]);

  /* Used to ensure the database is only accessed once */
  const [isWorkoutsLoaded, setWorkoutsLoaded] = useState(false);

  /* Only render Card if innerWidth > 576px (small breakpoint) */
  const [toRenderCard, setRenderCard] = useState(true);

  useEffect(() => {
    const getWorkouts = async () => {
      const q = query(workoutsCollectionRef, orderBy('name'), limit(10));
      const data = await getDocs(q);
      setWorkouts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    if (!isWorkoutsLoaded) {
      getWorkouts();
      setWorkoutsLoaded(true);
    }

    if (isWorkoutsLoaded) {
      if (authUser) {
        const favs = workouts.filter((doc) =>
          authUser.favouriteWorkouts.includes(doc.id)
        );
        const unfavs = workouts.filter(
          (doc) => !authUser.favouriteWorkouts.includes(doc.id)
        );
        const finalList = favs.concat(unfavs);
        setSelectedWorkout(finalList[0]);
        setWorkoutList(finalList);
      } else {
        setSelectedWorkout(workouts[0]);
        setWorkoutList(workouts);
      }
    }

    if (window.innerWidth < 576) {
      setRenderCard(false);
    }
  }, [authUser, isWorkoutsLoaded, workouts]);

  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onClick = () => {
    if (!toRenderCard) {
      handleOpen();
    } else {
      setSelectedWorkout(selectedWorkout);
    }
  };

  return (
    <>
      <TopNavbar />
      <Head>
        <title>Workout Buddy</title>
        <meta
          name="description"
          content="Workout Buddy - Helping you find and create workouts"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className={styles.container}>
        <div className={styles.heading}>
          <h1>Workouts</h1>
        </div>
        <Row>
          {toRenderCard && (
            <Col xs={6}>
              {selectedWorkout != null && (
                <div className={styles.imgcontainer}>
                  <Image
                    src={selectedWorkout.imageSource}
                    alt="workout image"
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
            <div>
              <main className={styles.main}>
                <List
                  list={workoutList}
                  listType="radio"
                  selected={selected}
                  setSelected={setSelected}
                  type="workouts"
                  onClick={onClick}
                />
              </main>
            </div>
          </Col>
        </Row>

        {selectedWorkout !== undefined && (
          <Modal
            show={isOpen}
            onHide={handleClose}
            centered
            scrollable
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>{selectedWorkout.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>Test</Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </>
  );
}
