import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Workout Buddy</title>
        <meta name="description" content="Workout Buddy - Helping you find and create workouts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Workout Buddy
        </h1>

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
        </div>
      </main>
    </div>
  )
}
