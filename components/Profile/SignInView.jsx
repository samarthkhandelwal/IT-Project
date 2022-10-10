// React
import React, { useState } from 'react';

// Bootstrap Components
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Firebase
import { useAuth } from '../../context/authUserContext';

// Styles
import styles from '../../styles/Settings.module.css';

export default function SignInView() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInEmail, signInGoogle } = useAuth();

  const onSubmit = () => {
    signInEmail(email, password);
  };

  const googleSignIn = () => {
    signInGoogle();
  };

  return (
    <>
      <Nav onClick={handleShow}>Sign in</Nav>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className={styles.container}>
            <main className={styles.main}>
              <Form onSubmit={onSubmit}>
                <h1>
                  <Form.Label>Sign In</Form.Label>
                </h1>

                <div className={styles.grid}>
                  <div className={styles.item}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="email"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                  </div>
                </div>

                <div className={styles.buttons}>
                  <Button variant="primary" type="submit">
                    Sign In
                  </Button>

                  <div className={styles.signup}>
                    <Button variant="primary" type="submit">
                      Sign Up
                    </Button>
                  </div>
                </div>
              </Form>
              <div className={styles.buttons}>
                <Button variant="primary" onClick={googleSignIn}>
                  Sign In with Google
                </Button>
              </div>
            </main>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
