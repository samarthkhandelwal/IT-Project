// BCustom components
import List from '../../components/List/List';
import TopNavbar from '../../components/Navbar/Navbar';

import Instructions from '../../components/Instructions';
import YouTube from '../../components/YouTube';
import { Container, Row, Col } from 'react-bootstrap';

// Styles
import styles from '../../styles/Exercises.module.css';

// React
import React, { useState } from 'react';

// Import the Exercise class so that we can create a dummy set of exercises to render
import Exercise from '../../public/classes/Exercise';

export default function ExercisesPage() {
  // A dummy exercise list so that we have data to render.
  // Once the database is implemented this will not be necessary
  const exercise_list = [];
  exercise_list.push(
    new Exercise('Bench Press', ['Chest', 'Shoulder', 'Triceps'], {
      Sets: 3,
      Reps: 8,
    }),
    new Exercise('Squats', ['Quadriceps', 'Hamstrings', 'Calves', 'Glutes'], {
      Sets: 3,
      Reps: 8,
    }),
    new Exercise(
      'Plank',
      ['Quadriceps', 'Hamstrings', 'Core', 'Triceps', 'Glutes'],
      { Sets: 3, Reps: 8 }
    ),
    new Exercise('Bench Dips ', ['Chest', 'Triceps'], { Sets: 3, Reps: 8 }),
    new Exercise('Lunges', ['Hamstrings', 'Glutes', 'Quadriceps', 'Calves'], {
      Sets: 3,
      Reps: 8,
    }),
    new Exercise('Custom exercise 1', ['Back', 'Biceps', 'Abs'], {
      Sets: 3,
      Reps: 8,
    }),
    new Exercise('Custom exercise 2', ['Quadriceps', 'Hamstrings', 'Calves'], {
      Sets: 3,
      Reps: 8,
    }),
    new Exercise(
      'Custom exercise 3',
      ['Chest', 'Back', 'Shoulder', 'Triceps'],
      { Sets: 3, Reps: 8 }
    )
  );

  const selectState = {};
  [selectState.selected, selectState.setSelected] = useState(
    exercise_list[0].name
  );

  return (
    <>
      <TopNavbar />
      <Container className={styles.container}>
        <Row>
          <Col>
            <YouTube link="https://www.youtube.com/watch?v=TwD-YGVP4Bk&t=9s" />
            <Instructions />
          </Col>

          <Col>
            <div>
              <main className={styles.main}>
                <List list={exercise_list} {...selectState} />
              </main>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
