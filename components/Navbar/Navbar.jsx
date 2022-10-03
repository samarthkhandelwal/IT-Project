// React
import React from 'react';

// Bootstrap components
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Next Components
import Link from 'next/link';

// Custom Components
// eslint-disable-next-line import/no-named-as-default
import ProfileView from '../../pages/profile';

// Styles
import styles from '../../styles/Navbar.module.css';

export default function TopNavbar() {
  return (
    <Navbar className={styles.navbar} fixed="top">
      <Link href="/" passHref>
        <Nav.Link className={styles.title}>Workout Buddy</Nav.Link>
      </Link>

      <Nav fill className={styles.items}>
        <Nav.Link className={styles.item}>
          <ProfileView />
        </Nav.Link>
        <Link href="/exercises" passHref>
          <Nav.Link className={styles.item}>Exercises</Nav.Link>
        </Link>
        <Link href="/workouts" passHref>
          <Nav.Link className={styles.item}>Workouts</Nav.Link>
        </Link>
      </Nav>
    </Navbar>
  );
}
