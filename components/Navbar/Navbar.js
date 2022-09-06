// Bootstrap components
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

// Styles
import styles from '../../styles/Navbar.module.css'

function TopNavbar() {
  return (
    <Navbar className={styles.navbar}>
      <Container>
        <Navbar.Brand href="/">Workout Buddy</Navbar.Brand>
        <Nav>
          <Nav.Link href="/exercises">Exercises</Nav.Link>
          <Nav.Link href="/workouts">Workouts</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
