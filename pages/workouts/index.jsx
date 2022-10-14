// React
import React, { useEffect, useState } from 'react';

// Firebase
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase-config';

// Bootstrap components
import CRUDButton from '../../components/CRUDButton/CRUDButton';
import List from '../../components/List/List';
import TopNavbar from '../../components/Navbar/Navbar';

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
        <main className={styles.main}>
          <CRUDButton type="workout" create />
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
