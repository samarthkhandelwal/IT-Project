// React
import React from 'react';

// Bootstrap Components
import Nav from 'react-bootstrap/Nav';
import Figure from 'react-bootstrap/Figure';

// Next Components
import Link from 'next/link';

// Custom Components
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
          <Figure>
            <Figure.Image
              width={200}
              height={200}
              alt="200x200"
              src="profile-pic.jpg"
            />
          </Figure>

          <div className={styles.grid}>
            <div className={styles.card}>
              <Link href="/" className={styles.card}>
                <p>Your favourites</p>
              </Link>
            </div>

            <div className={styles.card}>
              <Link href="/workouts" className={styles.card}>
                <p>Your workouts</p>
              </Link>
            </div>

            <div>
              <Nav>
                <Link href="/profile/settings" passHref>
                  <Nav.Link className={styles.card}>
                    <p>Settings</p>
                  </Nav.Link>
                </Link>
              </Nav>
            </div>

            <div>
              <Link href="/profile/signin" passHref>
                <Nav.Link className={styles.card}>
                  <p>Sign Out</p>
                </Nav.Link>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
