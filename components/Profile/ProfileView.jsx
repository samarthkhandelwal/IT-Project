// React
import React, { useState } from 'react';

// Bootstrap Components
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Offcanvas from 'react-bootstrap/Offcanvas';

// Next Components
import Link from 'next/link';

// Firebase
import { useAuth } from '../../context/authUserContext';

// Custom Components
// import SettingsView from './SettingsView';

// Styles
import styles from '../../styles/Profile.module.css';

export default function ProfileView() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { signOutUser, authUser } = useAuth();

  const handleSignOut = () => {
    signOutUser();
    handleClose();
  };

  return (
    <>
      <Nav onClick={handleShow}>Profile</Nav>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <div className={styles.container}>
            <main className={styles.main}>
              <h1>{authUser.name}</h1>
              <Image
                src={authUser.photoURL}
                width={150}
                height={150}
                roundedCircle="true"
              />

              <div className={styles.grid}>
                <div className={styles.card}>
                  <Link href="/workouts" className={styles.card}>
                    <p>Your workouts</p>
                  </Link>
                </div>

                {/* Waiting for email/pword sign in */}
                {/* <div>
                  <Nav.Link className={styles.card}>
                    <p>
                      <SettingsView />
                    </p>
                  </Nav.Link>
                </div> */}

                <div>
                  <Nav.Link className={styles.card} onClick={handleSignOut}>
                    <p>Sign out</p>
                  </Nav.Link>
                </div>
              </div>
            </main>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
