// Next components
import Link from 'next/link'

// Bootstrap components
import ProfileView from '../../pages/profile/index'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

// Styles
import styles from '../../styles/Navbar.module.css'

function TopNavbar() {
  return (
    <Navbar className={styles.navbar} fixed="top">
      <Link href='/' passHref>
        <Nav.Link className={styles.title}>Workout Buddy</Nav.Link>
      </Link>
      <Nav fill className={styles.items}>
      <Nav.Link className={styles.item}><ProfileView/></Nav.Link>
      <Link href='/exercises' passHref>
        <Nav.Link className={styles.item}>Exercises</Nav.Link>
      </Link>
      <Link href='/workouts' passHref>
        <Nav.Link className={styles.item}>Workouts</Nav.Link>
      </Link>
      </Nav>
    </Navbar>
  );
}

export default TopNavbar;
