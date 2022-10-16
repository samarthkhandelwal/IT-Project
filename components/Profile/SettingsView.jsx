// React
import React, { useState } from 'react';

// Bootstrap Components
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { FloatingLabel } from 'react-bootstrap';

// Firebase
import { useAuth } from '../../context/authUserContext';

// Styles
import styles from '../../styles/Settings.module.css';

export default function SettingsView() {
  const [show, setShow] = useState(false);

  const { authUser } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Nav onClick={handleShow}>Settings</Nav>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className={styles.container}>
            <main className={styles.main}>
              <Form>
                <h4>
                  <Form.Label>Update Profile Picture</Form.Label>
                </h4>
                <div className={styles.form}>
                  <Image src={authUser.photoURL} roundedCircle="true" />
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" size="sm" />
                  </Form.Group>
                </div>

                <h4>
                  <Form.Label>Change Name</Form.Label>
                </h4>
                <div className={styles.form}>
                  <FloatingLabel label="First Name" className="mb-3">
                    <Form.Control placeholder="Alice" />
                  </FloatingLabel>
                  <FloatingLabel label="Surname" className="mb-3">
                    <Form.Control placeholder="Brown" />
                  </FloatingLabel>
                </div>

                <h4>
                  <Form.Label>Change Password</Form.Label>
                </h4>
                <div className={styles.form}>
                  <FloatingLabel label="Enter New Password" className="mb-3">
                    <Form.Control type="password" />
                  </FloatingLabel>
                  <FloatingLabel label="Re-enter New Password" className="mb-3">
                    <Form.Control type="password" />
                  </FloatingLabel>
                </div>

                <div className={styles.form}>
                  <Button variant="primary" type="submit" onClick={handleClose}>
                    Save Changes
                  </Button>
                </div>
              </Form>
            </main>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
