/* eslint-disable react/jsx-props-no-spreading */
// React
import React, { useState, useEffect } from 'react';

// Firebase
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase-config';

// Custom components
import List from '../../components/List/List';
import TopNavbar from '../../components/Navbar/Navbar';

// Styles
import styles from '../../styles/Exercises.module.css';

// Get reference to workouts collection
const exercisesCollectionRef = collection(db, 'exercises');

export default function ExercisesPage() {
  const [exerciseList, setExerciseList] = useState([]);
  useEffect(() => {
    const getExercises = async () => {
      const q = query(exercisesCollectionRef, orderBy('name'), limit(10));
      const data = await getDocs(q);
      setExerciseList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getExercises();
  }, []);
  const selectState = {};
  [selectState.selected, selectState.setSelected] = useState();
  return (
    <>
      <TopNavbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <List list={exerciseList} listType="radio" {...selectState} />
        </main>
      </div>
    </>
  );
}
