// Next.js components
import Link from 'next/link';

// Bootstrap components
import TopNavbar from '../../components/Navbar/Navbar';

// Styles
import styles from '../../styles/Profile.module.css';

export default function ProfilePage() {
  return (
    <>
      <TopNavbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1>Alice Brown</h1>

          <div className={styles.grid}>
            <div className={styles.card}>
              <Link href="/profile" className={styles.card}>
                <p>Your favourites</p>
              </Link>
            </div>

            <div className={styles.card}>
              <Link href="/profile" className={styles.card}>
                <p>Your workouts</p>
              </Link>
            </div>

            <div className={styles.card}>
              <Link href="/profile" className={styles.card}>
                <p>Settings</p>
              </Link>
            </div>

            <div className={styles.card}>
              <Link href="/profile" className={styles.card}>
                <p>Sign out</p>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
