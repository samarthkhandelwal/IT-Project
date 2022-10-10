// BCustom components
import List from '../../components/List/List';
import TopNavbar from '../../components/Navbar/Navbar';

import WorkoutList from '../../components/WorkoutList/WorkoutList';
import Image from 'next/future/image';
import { Container, Row, Col } from 'react-bootstrap';

// Styles
import styles from '../../styles/Workouts/Workouts.module.css';

// React
import React, { useState } from 'react';

// Import the Exercise class so that we can create a dummy set of exercises to render
import Workout from '../../public/classes/Workout';
import Exercise from '../../public/classes/Exercise';

export default function WorkoutsPage() {
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

  const workout_list = [];
  workout_list.push(
    new Workout(
      'Push Workout',
      ['Chest', 'Shoulder', 'Triceps'],
      [
        'Bench Press',
        'Bench Dips',
        'Custom exercise 1',
        'Custom exercise 2',
        'Custom exercise 3',
      ]
    ),
    new Workout('Pull Workout', ['Back', 'Biceps', 'Abs']),
    new Workout('Legs Workout', ['Quadriceps', 'Hamstrings', 'Calves']),
    new Workout('Upper Workout', ['Chest', 'Back', 'Shoulder', 'Triceps']),
    new Workout('Workout 1', ['Chest', 'Shoulder', 'Triceps']),
    new Workout('Workout 2', ['Back', 'Biceps', 'Abs']),
    new Workout('Workout 3', ['Quadriceps', 'Hamstrings', 'Calves']),
    new Workout('Workout 4', ['Chest', 'Back', 'Shoulder', 'Triceps'])
  );

  const selectState = {};
  [selectState.selected, selectState.setSelected] = useState(
    workout_list[0].name
  );

  return (
    <>
      <TopNavbar />
      <Container className={styles.container}>
        <Row>
          <Col>
            <Image
              src={workout_list[0].imgSrc}
              alt="workout image"
              width="0"
              height="0"
              sizes="100vw"
              object-fit="cover"
              style={{ width: '100%', height: '50%' }}
            />
            <div>
              <main className={styles.workoutlist}>
                <WorkoutList exercise_list={exercise_list} />
              </main>
            </div>
          </Col>

          <Col>
            <div>
              <main className={styles.main}>
                <List list={workout_list} {...selectState} />
              </main>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
