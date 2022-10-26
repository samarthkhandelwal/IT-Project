// React
import React from 'react';

// Bootstrap components
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Next components
import Image from 'next/image';

// Styles
import styles from '../../styles/WorkoutForms/ExerciseElement.module.css';

export default function ExerciseElement({ exercise, onClick }) {
  return (
    <Row key={exercise.index} onClick={onClick} className={styles.exercise}>
      <Col xs={8} className={styles.name}>
        <Image
          src={exercise.imgSrc}
          alt={exercise.imgAlt}
          width="70%"
          height="50%"
          object-fit="cover"
        />
        <p>{exercise.name}</p>
      </Col>

      <Col xs={4} className="pt-2">
        <div>
          <p className={`ms-auto mb-0 ${styles.reps}`}>{exercise.reps} Reps</p>
          <p className={`ms-auto mb-2 ${styles.sets}`}>{exercise.sets} Sets</p>
        </div>
      </Col>
    </Row>
  );
}
