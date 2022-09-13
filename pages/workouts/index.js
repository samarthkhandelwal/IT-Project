// Next.js components
import Link from 'next/link'

// Bootstrap components
import TopNavbar from '../../components/Navbar/Navbar'
import List from "../../components/List/List";

// Styles
import styles from '../../styles/Workouts.module.css'

import Workout from "../../public/classes/Workout";

// Manually creating workouts so that we have data to use in creating the interface
const workout_list = [];
workout_list.push(
  new Workout("Push Workout", ["Chest", "Shoulder", "Triceps"])
);
workout_list.push(new Workout("Pull Workout", ["Back", "Biceps", "Abs"]));
workout_list.push(
  new Workout("Legs Workout", ["Quadriceps", "Hamstrings", "Calves"])
);
workout_list.push(
  new Workout("Upper Workout", ["Chest", "Back", "Shoulder", "Triceps"])
);

export default function WorkoutsPage() {
  return (
    <>
    <TopNavbar />
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>This is the workouts page!</h1>

        <List list={workout_list}></List>
        
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
