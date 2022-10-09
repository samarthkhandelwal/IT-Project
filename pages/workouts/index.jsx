/* eslint-disable react/jsx-props-no-spreading */
// React
import React, { useEffect, useState } from 'react';

// Firebase
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase-config';

// Bootstrap components
import TopNavbar from '../../components/Navbar/Navbar';
import List from '../../components/List/List';

// Styles
import styles from '../../styles/Workouts.module.css';

// Import the database reference and functions for reading from firestore

// Get reference to workouts collection
const workoutsCollectionRef = collection(db, 'workouts');

export default function WorkoutsPage() {
  const [workoutList, setWorkoutList] = useState([]);
  useEffect(() => {
    const getWorkouts = async () => {
      const q = query(workoutsCollectionRef, orderBy('name'), limit(10));
      const data = await getDocs(q);
      setWorkoutList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getWorkouts();
  }, []);
  const selectState = {};
  [selectState.selected, selectState.setSelected] = useState('');

  return (
    <>
      <TopNavbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <List list={workoutList} listType="radio" {...selectState} />
        </main>
      </div>
    </>
  );
}
