// React
import React, { useState, useEffect } from 'react';

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Next Components
import Link from 'next/link';

// Custom Components
import ProfileView from '../Profile/ProfileView';
import SignInView from '../Profile/SignInView';

// Styles
import styles from '../../styles/Navbar.module.css';

export default function TopNavbar() {
  /* Only use the OffCanvas component if innerWidth > 576px */
  const [useOffCanvas, setOffCanvas] = useState(true);
  useEffect(() => {
    if (window.innerWidth < 576) {
      setOffCanvas(false);
    }
  }, []);

  // TODO: Authentication
  function profileSignIn(isSignedIn) {
    if (useOffCanvas) {
      if (isSignedIn === true) {
        return (
          <Nav.Link className={styles.item}>
            <ProfileView />
          </Nav.Link>
        );
      }
      return (
        <Nav.Link className={styles.item}>
          <SignInView />
        </Nav.Link>
      );
    }
    if (isSignedIn === true) {
      return (
        <Link href="/profile" passHref>
          <Nav.Link className={styles.item}>Profile</Nav.Link>
        </Link>
      );
    }
    return (
      <Link href="/profile/signin" passHref>
        <Nav.Link className={styles.item}>Sign In</Nav.Link>
      </Link>
    );
  }

  return (
    <Navbar className={styles.navbar} fixed="top" expand="sm" collapseOnSelect>
      <Container fluid>
        <Navbar.Brand className={styles.title} bsPrefix="no-styling">
          My Workout Buddy
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar" />
        <Navbar.Collapse id="responsive-navbar">
          <Nav className="me-auto">
            <Link href="/exercises" passHref>
              <Nav.Link className={styles.item}>Exercises</Nav.Link>
            </Link>

            <Link href="/workouts" passHref>
              <Nav.Link className={styles.item}>Workouts</Nav.Link>
            </Link>
          </Nav>

          <Nav>{profileSignIn(true)}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
