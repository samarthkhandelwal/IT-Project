// Next.js components
import Link from 'next/link';

// React
import React, { useEffect, useState } from 'react';

// Bootstrap components
import TopNavbar from '../../components/Navbar/Navbar';
import List from '../../components/List/List';

// Styles
import styles from '../../styles/Workouts.module.css';

// Import the database reference and functions for reading from firestore
import { db } from '../../firebase-config';
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';

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
  [selectState.selected, selectState.setSelected] = useState();
  return (
    <>
      <TopNavbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <List list={workoutList} {...selectState} />

          <div className={styles.grid}>
            <div className={styles.card}>
              <Link href="/" className={styles.card}>
                <p>Click here to go back to the home page.</p>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
