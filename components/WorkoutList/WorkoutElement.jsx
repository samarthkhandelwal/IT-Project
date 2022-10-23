// Import React
import React from 'react';

// Next components
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';

// Styles
import styles from '../../styles/Workouts/WorkoutList.module.css';

// Element returns what should be displayed for each element of the list
export default function WorkoutElement({ element }) {
  // console.log(element)
  return (
    <Container className={styles.workoutexerciselist}>
      <Col xs={6}>
        <div className={styles.element}>
          <Image
            src={element.imgSrc}
            alt={element.imgAlt}
            height={40}
            width={65}
          />
          <div className={styles.txt}>
            <p>{element.name}</p>
          </div>
        </div>
      </Col>

      <Col xs={6}>
        <Row>
          <div className={styles.sr}>
            <p>{element.sets} sets</p>
          </div>
        </Row>
        <Row>
          <div className={styles.sr}>
            <p>{element.reps} reps</p>
          </div>
        </Row>
      </Col>
    </Container>
  );
}
