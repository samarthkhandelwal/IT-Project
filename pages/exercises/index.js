// Next components
import Link from 'next/link'

// BCustom components
import SearchBar from '../../components/Search/Search'

// Styles
import styles from '../../styles/Exercises.module.css'

export default function ExercisesPage() {
  return (
    <>
      <SearchBar />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1>
            This is the exercises page!
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
    </>
  )
}
