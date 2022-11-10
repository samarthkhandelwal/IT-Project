// istanbul ignore file

// React
import React from 'react';

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Offcanvas from 'react-bootstrap/Offcanvas';

// Next Components
import Link from 'next/link';

// Firebase
import { useAuth } from '../../context/authUserContext';

// Styles
import styles from '../../styles/Profile.module.css';

export default function ProfileView({ show, setShow }) {
  const handleClose = () => setShow(false);

  const { signOutUser, authUser } = useAuth();

  const handleSignOut = () => {
    signOutUser();
    handleClose();
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton />

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

            <div style={{ display: 'block', justifyContent: 'center' }}>
              <Link href="/userworkouts">
                <Button variant="primary" className="mt-3 mb-3">
                  Your created workouts
                </Button>
              </Link>{' '}
              <Button onClick={handleSignOut}>Sign out</Button>
              {authUser.role === 0 && (
                <>
                  <Link href="/admin/add" className={styles.card}>
                    <Button variant="primary" className="mt-3 mb-3">
                      Add admin
                    </Button>
                  </Link>{' '}
                  <Link href="/admin/remove" className={styles.card}>
                    <Button variant="primary" className="mt-3 mb-3">
                      Remove admin
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </main>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
