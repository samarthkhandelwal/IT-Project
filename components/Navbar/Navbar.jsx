// React
import React from 'react';

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

import { useAuth } from '../../context/authUserContext';

export default function TopNavbar() {
  // TODO: Authentication
  const { authUser } = useAuth();
  function profileSignIn() {
    if (authUser) {
      return <ProfileView />;
    }
    return <SignInView />;
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

          <Nav>
            <Nav.Link className={styles.item}>{profileSignIn()}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
