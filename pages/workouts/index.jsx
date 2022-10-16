// React
import React, { useEffect, useState } from 'react';

// Next
import Head from 'next/head';

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

  const [selected, setSelected] = useState('');

  return (
    <>
      <TopNavbar />
      <div className={styles.container}>
        <Head>
          <title>Workout Buddy</title>
          <meta
            name="description"
            content="Workout Buddy - Helping you find and create workouts"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1>Workouts</h1>
          <List
            list={workoutList}
            listType="radio"
            selected={selected}
            setSelected={setSelected}
          />
        </main>
      </div>
    </>
  );
}
