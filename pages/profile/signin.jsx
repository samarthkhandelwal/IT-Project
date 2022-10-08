// React
import React from 'react';

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Custom Components
import TopNavbar from '../../components/Navbar/Navbar';

// Styles
import styles from '../../styles/Settings.module.css';

export default function SignInPage() {
  return (
    <>
      <TopNavbar />
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
    </>
  );
}
