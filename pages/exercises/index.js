// Next components
import Link from 'next/link'

// BCustom components
import SearchBar from '../../components/Search/Search'
import YouTube from '../../components/YouTube'
import { Container, Row, Col } from "react-bootstrap";

// Styles
import styles from '../../styles/Exercises.module.css'
import Instructions from '../../components/Instructions';

export default function ExercisesPage() {
  return (
    <>
      <Container className={styles.container}>
        <Row>
          <Col>
            <YouTube />
            <Instructions />
          </Col>
          <Col>
            <SearchBar />
          </Col>
        </Row>
      </Container>
      
    </>
  )
}
