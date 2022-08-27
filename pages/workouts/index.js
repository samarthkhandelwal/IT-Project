import Link from 'next/link'
import styles from '../../styles/Workouts.module.css'

export default function WorkoutsPage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>
          This is the workouts page!
        </h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Link href="/" className={styles.card}>
              <p>Click here to go back to the home page.</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
