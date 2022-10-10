// Import React
import React from 'react';

// Next components
import Image from 'next/image';

// Styles
import styles from '../../styles/Workouts/WorkoutList.module.css';

// Element returns what should be displayed for each element of the list
export default function WorkoutElement({ element }) {
  return (
    <div className={styles.element}>
      <Image src={element.imgSrc} alt={element.imgAlt} height={40} width={65} />

      <div className={styles.txt}>
        <p>{element.name}</p>
      </div>
    </div>
  );
}
