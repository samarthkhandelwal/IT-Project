/* eslint-disable react/jsx-props-no-spreading */
// React
import React, { useState } from 'react';

// Custom components
import List from '../../components/List/List';
import TopNavbar from '../../components/Navbar/Navbar';

// Styles
import styles from '../../styles/Exercises.module.css';

// Import the Exercise class so that we can create a dummy set of exercises to render
import Exercise from '../../public/classes/Exercise';

export default function ExercisesPage() {
  // A dummy exercise list so that we have data to render.
  // Once the database is implemented this will not be necessary
  const exerciseList = [];
  exerciseList.push(
    new Exercise('Bench Press', ['Chest', 'Shoulder', 'Triceps']),
    new Exercise('Squats', ['Quadriceps', 'Hamstrings', 'Calves', 'Glutes']),
    new Exercise('Plank', [
      'Quadriceps',
      'Hamstrings',
      'Core',
      'Triceps',
      'Glutes',
    ]),
    new Exercise('Bench Dips ', ['Chest', 'Triceps']),
    new Exercise('Lunges', ['Hamstrings', 'Glutes', 'Quadriceps', 'Calves']),
    new Exercise('Custom exercise 1', ['Back', 'Biceps', 'Abs']),
    new Exercise('Custom exercise 2', ['Quadriceps', 'Hamstrings', 'Calves']),
    new Exercise('Custom exercise 3', ['Chest', 'Back', 'Shoulder', 'Triceps'])
  );

  const selectState = {};
  [selectState.selected, selectState.setSelected] = useState(
    exerciseList[0].name
  );

  return (
    <>
      <TopNavbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <List list={exerciseList} {...selectState} />
        </main>
      </div>
    </>
  );
}
