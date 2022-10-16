// React
import React from 'react';

// Styles
import styles from '../styles/Instructions.module.css';

export default function Instructions() {
  const text = `
    Step 1: Stand up straight with your torso upright. Hold a dumbbell in
    each hand at arms-length. Your elbows should be close to your torso.
  
    Step 2: The palms of your hands should be facing your torso. This is
    the starting position for the exercise.
  
    Step 3: Curl the weight forward while contracting your biceps. Your
    upper arm should remain stationary. Continue to lift the weight until
    your biceps are fully contracted and the dumbbell is at shoulder
    level. Hold the contraction for a moment as you squeeze your biceps.
  
    Step 4: Inhale and slowly start to bring the dumbbells back to the
    starting position.

    Step 5: Repeat for the desired number of reps.`;

  return (
    <div className={styles.instructions}>
      <span className={styles.line}>{text}</span>
    </div>
  );
}
