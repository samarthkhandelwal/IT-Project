// Import React
import React, { useState } from 'react';

// Styles
import styles from '../../styles/List.module.css';

const star = '/images/star.png';
const starFilled = '/images/starFilled.png';

// Element returns what should be displayed for each element of the list
export default function Element({element}) {

  return (
    <div className={styles.selement}>
      <div className={styles.stxt}>
        <h1>{element.name}</h1>
        <p>{element.muscleGroups.join(', ')}</p>
      </div>
    </div>
  );
}
