// Next.js components
import Link from "next/link";

// Bootstrap components
import TopNavbar from "../../components/Navbar/Navbar";

// Styles
import styles from "../../styles/Exercises.module.css";

export default function ExercisesPage() {
  return (
    <>
      <TopNavbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1>This is the exercises page!</h1>

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
