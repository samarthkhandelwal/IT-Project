// React
import React, { useState } from 'react';

// Bootstrap Components
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Styles
import styles from '../../styles/Settings.module.css';

export default function SignInView() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              <Form>
                <h1>
                  <Form.Label>Sign In</Form.Label>
                </h1>

                <div className={styles.grid}>
                  <div className={styles.item}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
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
            </main>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
