// React
import React from 'react';

// Bootstrap components
import Col from 'react-bootstrap/Col';

// Custom components
import Video from '../Video/Video';

// Styles
import styles from '../../styles/List.module.css';

/**
 * Card that displays information about the selected exercise.
 * @param {*} selectedExercise The exercise that is being displayed
 */
export default function Card({ selectedExercise }) {
  if (selectedExercise !== undefined) {
    return (
      <Col xs={6} className={styles.scrollableContainer}>
        <h2>{selectedExercise.name}</h2>
        <Video
          videoURL={selectedExercise.videoURL}
          titleAlt={`${selectedExercise.name} Video`}
        />
        <h5>
          Equipment required:{' '}
          {selectedExercise.equipment !== undefined
            ? selectedExercise.equipment
            : 'None'}
        </h5>

        <h5>Instructions:</h5>
        {selectedExercise.instructions}
      </Col>
    );
  }
  return null;
}
