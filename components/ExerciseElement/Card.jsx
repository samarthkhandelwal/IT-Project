// React
import React from 'react';

// Bootstrap components
import Col from 'react-bootstrap/Col';
import Video from '../Video/Video';

// Styles
import styles from '../../styles/List.module.css';

export default function Card({ selectedExercise }) {
  return (
    <Col xs={6}>
      <div className={styles.scrollableContainer}>
        <h2>{selectedExercise.name}</h2>
        <Video videoURL={selectedExercise.videoURL} />
        {selectedExercise.instructions}
      </div>
    </Col>
  );
}
