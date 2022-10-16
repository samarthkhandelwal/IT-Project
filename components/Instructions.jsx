// React
import React from 'react';

// Styles
import styles from '../styles/Instructions.module.css';

export default function Instructions({ text }) {
  return (
    <div className={styles.instructions}>
      <span className={styles.line}>{text}</span>
    </div>
  );
}
