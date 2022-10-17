// React
import React, { useEffect, useState } from 'react';

// Bootstrap components
import ListTest from '../components/Test/ListTest';

// Styles
import styles from '../styles/Workouts/Workouts.module.css';

// Authentication
import { exercises } from '../testData/testData';

export default function ExercisesPage() {
  const [exerciseList, setExerciseList] = useState([]);
  useEffect(() => {
    const getExercises = () => {
      setExerciseList(exercises);
    };
    getExercises();
  }, []);

  const [selected, setSelected] = useState('');

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ListTest
          list={exerciseList}
          listType="radio"
          selected={selected}
          setSelected={setSelected}
          type="workouts"
        />
      </main>
    </div>
  );
}
