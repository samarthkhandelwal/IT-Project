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

// Authentication
import { useAuth } from '../../context/authUserContext';

// Get reference to workouts collection
const workoutsCollectionRef = collection(db, 'workouts');

export default function WorkoutsPage() {
  const [workoutList, setWorkoutList] = useState([]);
  const { authUser } = useAuth();
  useEffect(() => {
    const getWorkouts = async () => {
      const q = query(workoutsCollectionRef, orderBy('name'), limit(10));
      const data = await getDocs(q);
      const workouts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      if (authUser) {
        const favs = workouts.filter((doc) =>
          authUser.favouriteWorkouts.includes(doc.id)
        );
        const unfavs = workouts.filter(
          (doc) => !authUser.favouriteWorkouts.includes(doc.id)
        );
        setWorkoutList(favs.concat(unfavs));
      } else {
        setWorkoutList(workouts);
      }
    };
    getWorkouts();
  }, [authUser]);

  const [selected, setSelected] = useState('');

  return (
    <>
      <TopNavbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <List
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
