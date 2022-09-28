// Bootstrap components
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Custom components
import ExerciseElement from '../ExerciseElement/ExerciseElement';

// Import React
import React, { useState } from 'react';

// Styles
import styles from '../../styles/List.module.css';

export default function ExerciseList({ list }) {
  // State of the image that is displayed as the favourite button
  const [selectedExercise, setExercise] = useState(list[0]);

  // Event handler if the exercise element is clicked on
  const selectExercise = (id) => {
    setExercise(list[id]);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col className={styles.side}>
            <div className={styles.scrollableContainer}>
              <Card>
                <Card.Title>{selectedExercise.name}</Card.Title>
                <Card.Body>
                  {selectedExercise.instructions.map((step, index) => (
                    <p key={index}>
                      Step {index + 1}: {step}
                    </p>
                  ))}
                </Card.Body>
              </Card>
            </div>
          </Col>

          <Col>
            <div className={styles.scrollableContainer}>
              {list.map((element) => (
                <ExerciseElement
                  exercise={element}
                  updateCard={selectExercise}
                  key={element.id}
                  className={styles.element}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
