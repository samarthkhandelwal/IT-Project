// React
import React, { useState, useEffect } from 'react';

// Bootstrap components
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// Firebase
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase-config';

// Custom Components
import Instructions from '../../components/Instructions';
import List from '../../components/List/List';
import TopNavbar from '../../components/Navbar/Navbar';
import YouTube from '../../components/YouTube';
// import Card from '../../components/ExerciseElement/Card';
// import ExerciseElement from '../../components/ExerciseElement/ExerciseElement';

// Styles
import styles from '../../styles/List.module.css';

// Authentication
import { useAuth } from '../../context/authUserContext';

// Get reference to exercises collection
const exercisesCollectionRef = collection(db, 'exercises');

export default function ExercisesPage() {
  /* Get exercises from the database */
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

  const selectState = {};
  [selectState.selected, selectState.setSelected] = useState();

  /* TODO: Make this work with the database instead */
  /* State of selected exercise that appears in the card or modal */
  // const [selectedExercise, setExercise] = useState(exercises[0]);

  // /* Event handler if an exercise in the list is clicked on */
  // const selectExercise = (id) => {
  //   setExercise(exercises[id]);
  // };

  /* Only render Card if innerWidth > 576px (small breakpoint) */
  // const [toRenderCard, setRenderCard] = useState(true);
  // useEffect(() => {
  //   if (window.innerWidth < 576) {
  //     setRenderCard(false);
  //   }
  // }, []);

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
        <Row>
          <Col>
            {/* {toRenderCard ? (
              <Card selectedExercise={selectedExercise} />
            ) : (
              <Col />
            )} */}
            {selectedExercise != null && (
              <YouTube link={selectedExercise.videoURL} />
            )}
            {selectedExercise != null && (
              <Instructions text={selectedExercise.instructions} />
            )}
          </Col>

          <Col>
            {/* {exercises.map((element) => (
              <ExerciseElement
                exercise={element}
                updateCard={selectExercise}
                key={element.id}
              />
            ))} */}
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
