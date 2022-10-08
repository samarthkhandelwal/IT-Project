// React
import React from 'react';

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';

// Custom Components
import TopNavbar from '../../components/Navbar/Navbar';

// Styles
import styles from '../../styles/Settings.module.css';

export default function SettingsPage() {
  return (
    <>
      <TopNavbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <Form>
            <h3>
              <Form.Label>Change Name</Form.Label>
            </h3>

            <div className={styles.item}>
              <FloatingLabel label="First Name" className="mb-3">
                <Form.Control placeholder="Alice" />
              </FloatingLabel>
              <FloatingLabel label="Surname" className="mb-3">
                <Form.Control placeholder="Brown" />
              </FloatingLabel>
            </div>

            <h3>
              <Form.Label>Change Password</Form.Label>
            </h3>

            <div className={styles.item}>
              <FloatingLabel label="Enter New Password" className="mb-3">
                <Form.Control type="password" />
              </FloatingLabel>
              <FloatingLabel label="Re-enter New Password" className="mb-3">
                <Form.Control type="password" />
              </FloatingLabel>
            </div>

            <div className={styles.item}>
              <Button href="/profile" variant="primary" type="submit">
                Confirm
              </Button>
            </div>
          </Form>
        </main>
      </div>
    </>
  );
}
