// Bootstrap components
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

// Styles
import styles from '../../styles/Navbar.module.css'

function TopNavbar() {
  return (
    <Navbar className={styles.navbar} fixed="top">
      <Nav.Link href="/" className={styles.title}>Workout Buddy</Nav.Link>
      <Nav fill className={styles.items}>
        <Nav.Link href="/exercises" className={styles.item}>Exercises</Nav.Link>
        <Nav.Link href="/workouts" className={styles.item}>Workouts</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default TopNavbar;
