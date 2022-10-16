// React
import React, { useState, useEffect } from 'react';

// Bootstrap components
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// Firebase
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase-config';

// Custom components
import CRUDButton from '../../components/CRUDButton/CRUDButton';
import Instructions from '../../components/Instructions';
import List from '../../components/List/List';
import TopNavbar from '../../components/Navbar/Navbar';
import YouTube from '../../components/YouTube';

// Styles
import styles from '../../styles/Exercises.module.css';

// Authentication
import { useAuth } from '../../context/authUserContext';

// Get reference to exercises collection
const exercisesCollectionRef = collection(db, 'exercises');

export default function ExercisesPage() {
  const [exerciseList, setExerciseList] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState();
  const { authUser } = useAuth();

  useEffect(() => {
    const getExercises = async () => {
      const q = query(exercisesCollectionRef, orderBy('name'), limit(10));
      const data = await getDocs(q);
      const exercises = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

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
    };
    getExercises();
  }, [authUser]);

  const [selected, setSelected] = useState('');

  useEffect(() => {
    const getSelected = () => {
      if (selected) {
        exerciseList.forEach((doc) => {
          if (doc.id === selected) {
            setSelectedExercise(doc);
          }
        });
      }
    };
    getSelected();
  }, [selected, exerciseList]);

  return (
    <>
      <TopNavbar />
      <Container className={styles.container}>
        <CRUDButton type="exercise" create />
        <Row>
          <Col>
            {selectedExercise != null && (
              <YouTube link={selectedExercise.videoURL} />
            )}
            {selectedExercise != null && (
              <Instructions text={selectedExercise.instructions} />
            )}
          </Col>

          <Col>
            <div>
              <main className={styles.main}>
                <List
                  list={exerciseList}
                  listType="radio"
                  selected={selected}
                  setSelected={setSelected}
                  type="exercises"
                />
              </main>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
