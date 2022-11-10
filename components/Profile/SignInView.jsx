// React
import React from 'react';

// Bootstrap Components
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';

// Firebase
import { useAuth } from '../../context/authUserContext';

// Styles
import styles from '../../styles/Settings.module.css';

export default function SignInView({ show, setShow }) {
  const handleClose = () => setShow(false);

  const { signInGoogle } = useAuth();

  const googleSignIn = () => {
    signInGoogle();
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Sign In</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className={styles.container}>
          <main className={styles.main}>
            <div className={styles.buttons}>
              <Button variant="primary" onClick={googleSignIn}>
                Sign In with Google
              </Button>
            </div>
          </main>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
