/* eslint-disable react/jsx-props-no-spreading */
// React
import React, { useState } from 'react';

// Bootstrap components
import TopNavbar from '../../components/Navbar/Navbar';
import List from '../../components/List/List';

// Styles
import styles from '../../styles/Workouts.module.css';

// Import the Workout class so that we can create a dummy set of workouts to render
import Workout from '../../public/classes/Workout';

export default function WorkoutsPage() {
  // A dummy workout list so that we have data to render.
  // Once the database is implemented this will not be necessary
  const workoutList = [];
  workoutList.push(
    new Workout('Push Workout', ['Chest', 'Shoulder', 'Triceps']),
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
    workoutList[0].name
  );

  return (
    <>
      <TopNavbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <List list={workoutList} {...selectState} />
        </main>
      </div>
    </>
  );
}
