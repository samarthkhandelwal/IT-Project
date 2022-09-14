// Next.js components
import Link from "next/link";

// React
import React, { useState } from "react";

// Bootstrap components
import TopNavbar from "../../components/Navbar/Navbar";
import List from "../../components/List/List";

// Styles
import styles from "../../styles/Workouts.module.css";

// Import a list of manually created workouts so that we have data to work with.
// Once the database is connected, will not be necessary
import workout_list from "../../public/classes/Workout";

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
          <h1>This is the workouts page!</h1>

          <List list={workout_list} {...selectState}></List>

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
