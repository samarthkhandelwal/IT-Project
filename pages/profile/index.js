// Next.js components
import Link from 'next/link'

// Bootstrap components
import Nav from 'react-bootstrap/Nav'
import React, { useState } from 'react';
import Figure from 'react-bootstrap/Figure';
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
    <Nav onClick={handleShow}>Profile</Nav>

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
        <Figure>
          <Figure.Image
          width={171}
          height={180}
          alt="360x360"
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
            <Nav.Link className={styles.card}>
              <p><SettingsView/></p>
            </Nav.Link>
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
