// Next.js components
import Link from 'next/link';

// React
import React, { useState } from 'react';

// Bootstrap components
import TopNavbar from '../../components/Navbar/Navbar';
import List from '../../components/List/List';

// Styles
import styles from '../../styles/Workouts.module.css';

// Import the Workout class so that we can create a dummy set of workouts to render
import Workout from '../../public/classes/Workout';

// A dummy workout list so that we have data to render.
// Once the database is implemented this will not be necessary
const workout_list = [];
workout_list.push(
  new Workout('Push Workout', ['Chest', 'Shoulder', 'Triceps'])
);
workout_list.push(new Workout('Pull Workout', ['Back', 'Biceps', 'Abs']));
workout_list.push(
  new Workout('Legs Workout', ['Quadriceps', 'Hamstrings', 'Calves'])
);
workout_list.push(
  new Workout('Upper Workout', ['Chest', 'Back', 'Shoulder', 'Triceps'])
);
workout_list.push(new Workout('Workout 1', ['Chest', 'Shoulder', 'Triceps']));
workout_list.push(new Workout('Workout 2', ['Back', 'Biceps', 'Abs']));
workout_list.push(
  new Workout('Workout 3', ['Quadriceps', 'Hamstrings', 'Calves'])
);
workout_list.push(
  new Workout('Workout 4', ['Chest', 'Back', 'Shoulder', 'Triceps'])
);

export default function WorkoutsPage() {
  const selectState = {};
  [selectState.selected, selectState.setSelected] = useState(
    workout_list[0].name
  );
  return (
    <>
      <TopNavbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <List list={workout_list} listType="radio" {...selectState} />

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
