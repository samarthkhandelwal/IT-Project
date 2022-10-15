// React
import React, { useEffect, useState } from 'react';

// Bootstrap components
import ListTest from '../components/Test/ListTest';

// Styles
import styles from '../../styles/Workouts.module.css';

// Authentication
import { workouts } from '../testData/testData';

export default function WorkoutsPage() {
  const [workoutList, setWorkoutList] = useState([]);
  useEffect(() => {
    const getWorkouts = () => {
      setWorkoutList(workouts);
    };
    getWorkouts();
  }, []);

  const [selected, setSelected] = useState('');

  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <ListTest
            list={workoutList}
            listType="radio"
            selected={selected}
            setSelected={setSelected}
            type="workouts"
          />
        </main>
      </div>
    </>
  );
}
