// Next.js components
import Link from 'next/link'

// Bootstrap components
import TopNavbar from '../../components/Navbar/Navbar'
import Nav from 'react-bootstrap/Nav'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

// Styles
import styles from '../../styles/Settings.module.css'


export default function SettingsView() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Nav.Link className={styles.item} onClick={handleShow}>
        Settings
      </Nav.Link>


      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className={styles.container}>
        <main className={styles.main}>
          <h1>
            Alice Brown
          </h1>
          
        </main>
      </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
