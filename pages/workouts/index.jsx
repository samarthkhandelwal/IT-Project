// React
import React, { useEffect, useState } from 'react';

// Bootstrap components
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// Next components
import Image from 'next/image';

// Firebase
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase-config';

// Custom components
import TopNavbar from '../../components/Navbar/Navbar';
import List from '../../components/List/List';
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

  useEffect(() => {
    const getWorkouts = async () => {
      const q = query(workoutsCollectionRef, orderBy('name'), limit(10));
      const data = await getDocs(q);
      const workouts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

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
    };
    getWorkouts();
  }, [authUser]);

  useEffect(() => {
    const getSelected = () => {
      workoutList.forEach((doc) => {
        if (doc.id === selected) {
          setSelectedWorkout(doc);
        }
      });
    };

    getSelected();
  }, [selected, workoutList]);

  return (
    <>
      <TopNavbar />
      <Container className={styles.container}>
        <Row>
          <Col>
            {selectedWorkout != null && (
              <div className={styles.imgcontainer}>
                <Image
                  src={selectedWorkout.imgSrc}
                  alt="workout image"
                  width="0"
                  height="0"
                  sizes="100vw"
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

          <Col>
            <div>
              <main className={styles.main}>
                <List
                  list={workoutList}
                  listType="radio"
                  selected={selected}
                  setSelected={setSelected}
                  type="workouts"
                />
              </main>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
