/* eslint-disable react/jsx-props-no-spreading */
// React
import React, { useState, useEffect } from 'react';

// Bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Firebase
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase-config';

// Custom Components
// import Card from '../../components/ExerciseElement/Card';
import List from '../../components/List/List';
// import ExerciseElement from '../../components/ExerciseElement/ExerciseElement';
import TopNavbar from '../../components/Navbar/Navbar';

// Styles
import styles from '../../styles/List.module.css';

// Static content (to be replaced once database is set up)
// const exercises = [
//   {
//     id: 0,
//     name: 'Hammer Curl',
//     muscleGroups: ['Upper arm', 'Lower arm'],
//     imgSrc: '/../public/images/hammer-curls.png',
//     imgAlt: 'Hammer curl positions',
//     instructions: [
//       'Stand up straight with your torso upright. Hold a dumbbell in each hand at arms-length. Your elbows should be close to your torso. ',
//       'The palms of your hands should be facing your torso. This is the starting position for the exercise. ',
//       'Curl the weight forward while contracting your biceps. Your upper arm should remain stationary. Continue to lift the weight until your biceps are fully contracted and the dumbbell is at shoulder level. Hold the contraction for a moment as you squeeze your biceps. ',
//       'Inhale and slowly start to bring the dumbbells back to the starting position. ',
//       'Repeat for the desired number of reps. ',
//     ],
//     videoURL: 'https://www.youtube.com/embed/TwD-YGVP4Bk',
//   },
//   {
//     id: 1,
//     name: 'Plank',
//     muscleGroups: ['Quadriceps', 'Hamstrings', 'Core', 'Triceps', 'Glutes'],
//     imgSrc: '/../public/images/hammer-curls.png',
//     imgAlt: 'Performing a plank',
//     instructions: [
//       'Lie face down with your forearms on the floor, and your elbows directly underneath your shoulders. Your forearms should be parallel. Point your feet so that your toes are on the floor. ',
//       'Lift your body up by engaging your core, so that only your toes and forearms are touching the ground. Your spine and legs should be straight. ',
//       'Hold this position for 30 seconds. Then, release and bring your knees to the ground.',
//     ],
//     videoURL: 'https://www.youtube.com/embed/wCBOqf-HrTI',
//   },
// ];

// Get reference to exercises collection
const exercisesCollectionRef = collection(db, 'exercises');

export default function ExercisesPage() {
  /* Get exercises from the database */
  const [exerciseList, setExerciseList] = useState([]);
  useEffect(() => {
    const getExercises = async () => {
      const q = query(exercisesCollectionRef, orderBy('name'), limit(10));
      const data = await getDocs(q);
      setExerciseList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getExercises();
  });

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

  return (
    <>
      <TopNavbar />
      <div className={styles.main}>
        <Row>
          <Col />
          {/* {toRenderCard ? (
            <Card selectedExercise={selectedExercise} />
          ) : (
            <Col />
          )} */}
          <Col>
            <List list={exerciseList} listType="radio" {...selectState} />
            {/* {exercises.map((element) => (
              <ExerciseElement
                exercise={element}
                updateCard={selectExercise}
                key={element.id}
              />
            ))} */}
          </Col>
        </Row>
      </div>
    </>
  );
}
