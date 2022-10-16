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

// Authentication
import { useAuth } from '../../context/authUserContext';

// Get reference to exercises collection
const exercisesCollectionRef = collection(db, 'exercises');

export default function ExercisesPage() {
  const [exerciseList, setExerciseList] = useState([]);
  const { authUser } = useAuth();
  useEffect(() => {
    const getExercises = async () => {
      const q = query(exercisesCollectionRef, orderBy('name'), limit(10));
      const data = await getDocs(q);
      const exercises = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      if (authUser) {
        const favs = exercises.filter((doc) =>
          authUser.favouriteExercises.includes(doc.id)
        );
        const unfavs = exercises.filter(
          (doc) => !authUser.favouriteExercises.includes(doc.id)
        );
        setExerciseList(favs.concat(unfavs));
      } else {
        setExerciseList(exercises);
      }
    };
    getExercises();
  }, [authUser]);
  const [selected, setSelected] = useState('');
  return (
    <>
      <TopNavbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <List
            list={exerciseList}
            listType="radio"
            selected={selected}
            setSelected={setSelected}
            type="exercises"
          />
        </main>
      </div>
    </>
  );
}
