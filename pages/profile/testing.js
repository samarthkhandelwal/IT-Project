// Next.js components
import Link from 'next/link'

// Bootstrap components
import TopNavbar from '../../components/Navbar/Navbar'

// Styles
import styles from '../../styles/Profile.module.css'

export default function ProfilePage() {
  return (
    <>
      <TopNavbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1>
            Alice Brown
          </h1>

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


// Next.js components
import Link from 'next/link'

// Bootstrap components
import TopNavbar from '../../components/Navbar/Navbar'
import Nav from 'react-bootstrap/Nav'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

// Styles
import styles from '../../styles/Profile.module.css'
import SettingsView from './settings';


export default function ProfileView() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Nav.Link className={styles.item} onClick={handleShow}>
        Profile
      </Nav.Link>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className={styles.container}>
        <main className={styles.main}>
          <h1>
            Alice Brown
          </h1>

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

            <div className={styles.card}>
              <SettingsView/ >
            </div>

            <div className={styles.card}>
              <Link href="/" className={styles.card}>
                <p>Sign out</p>
              </Link>
            </div>
          </div>
        </main>
      </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
