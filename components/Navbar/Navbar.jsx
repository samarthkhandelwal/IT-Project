// React
import React, { useState } from 'react';

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Next Components
import Link from 'next/link';
import { useRouter } from 'next/router';

// Custom Components
import ProfileView from '../Profile/ProfileView';
import SignInView from '../Profile/SignInView';

// Styles
import styles from '../../styles/Navbar.module.css';

// User Authentication
import { useAuth } from '../../context/authUserContext';

export default function TopNavbar() {
  const router = useRouter();

  // State to keep track of whether to show sign in view
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const { authUser } = useAuth();
  function profileSignIn() {
    if (authUser) {
      return <ProfileView show={show} setShow={setShow} />;
    }
    return <SignInView show={show} setShow={setShow} />;
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
            {authUser &&
              (router.pathname.includes('exercises') ? (
                <Link href="/exercises/create" passHref>
                  <Nav.Link className={styles.item}>New exercise</Nav.Link>
                </Link>
              ) : (
                <Link href="/workouts/create" passHref>
                  <Nav.Link className={styles.item}>New workout</Nav.Link>
                </Link>
              ))}
            <Nav.Link className={styles.item}>
              {authUser === null ? (
                <Nav onClick={handleShow}>Sign In</Nav>
              ) : (
                <Nav onClick={handleShow}>Profile</Nav>
              )}
              {profileSignIn()}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
