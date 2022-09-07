// Next.js components
import Head from 'next/head'
import Link from 'next/link'

// Bootstrap components
import TopNavbar from '../components/Navbar/Navbar'

// Styles
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <TopNavbar />
      <div className={styles.container}>
        <Head>
          <title>Workout Buddy</title>
          <meta name="description" content="Workout Buddy - Helping you find and create workouts" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <p className={styles.description}>
            Helping you find and create workouts
          </p>

          <div className={styles.grid}>
            <Link href="/workouts">
              <div className={styles.card}>
                <h2>Find workouts &rarr;</h2>
                <p>Explore our catalog of workouts</p>
              </div>
            </Link>

            <Link href="/exercises">
              <div className={styles.card}>
                <h2>Find exercises &rarr;</h2>
                <p>Explore our catalog of exercises</p>
              </div>
            </Link>

            <Link href="/profile">
              <div className={styles.card}>
                <h2>Login &rarr;</h2>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </>
  )
}
