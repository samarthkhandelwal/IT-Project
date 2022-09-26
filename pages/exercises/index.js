// BCustom components
import List from '../../components/List/List';
import TopNavbar from '../../components/Navbar/Navbar';

import Instructions from '../../components/Instructions';
import SearchBar from '../../components/Search/Search'
import YouTube from '../../components/YouTube'
import { Container, Row, Col } from "react-bootstrap";

// Styles
import styles from '../../styles/Exercises.module.css'

// React
import React, { useState } from 'react';

// Import the Exercise class so that we can create a dummy set of exercises to render
import Exercise from '../../public/classes/Exercise';

export default function ExercisesPage() {
  // A dummy exercise list so that we have data to render.
  // Once the database is implemented this will not be necessary
  const exercise_list = [];
  exercise_list.push(
    new Exercise('Bench Press', ['Chest', 'Shoulder', 'Triceps']),
    new Exercise('Squats', ['Quadriceps', 'Hamstrings', 'Calves', 'Glutes']),
    new Exercise('Plank', ['Quadriceps', 'Hamstrings', 'Core', 'Triceps', 'Glutes']),
    new Exercise('Bench Dips ', ['Chest', 'Triceps']),
    new Exercise('Lunges', ['Hamstrings', 'Glutes', 'Quadriceps', 'Calves']),
    new Exercise('Custom exercise 1', ['Back', 'Biceps', 'Abs']),
    new Exercise('Custom exercise 2', ['Quadriceps', 'Hamstrings', 'Calves']),
    new Exercise('Custom exercise 3', ['Chest', 'Back', 'Shoulder', 'Triceps'])
  );

  const selectState = {};
  [selectState.selected, selectState.setSelected] = useState(
    exercise_list[0].name
  );

  return (
    <>
      <TopNavbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <List list={exercise_list} {...selectState} />
        </main>
      </div>

      {/* <Container className={styles.container}>
        <Row>
          <Col>
            <YouTube />
            <Instructions />
          </Col>
        </Row>
      </Container> */}
    </>
  )
}
