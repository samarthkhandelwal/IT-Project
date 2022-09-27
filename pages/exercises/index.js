// BCustom components
import List from '../../components/List/List';
import TopNavbar from '../../components/Navbar/Navbar';
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard';

// Bootstrap
import Container from 'react-bootstrap/Container';
// Styles
import styles from '../../styles/Exercises.module.css';

// React
import React, { useState } from 'react';

// Import the Exercise class so that we can create a dummy set of exercises to render
import Exercise from '../../public/classes/Exercise';

export default function ExercisesPage() {
  // A dummy exercise list so that we have data to render.
  // Once the database is implemented this will not be necessary
  const exercise_list = [];
  exercise_list.push(
    new Exercise('Bench Press', ['Chest', 'Shoulder', 'Triceps']),
    new Exercise('Squats', ['Quadriceps', 'Hamstrings', 'Calves', 'Glutes']),
    new Exercise('Plank', [
      'Quadriceps',
      'Hamstrings',
      'Core',
      'Triceps',
      'Glutes',
    ]),
    new Exercise('Bench Dips ', ['Chest', 'Triceps']),
    new Exercise('Lunges', ['Hamstrings', 'Glutes', 'Quadriceps', 'Calves']),
    new Exercise('Custom exercise 1', ['Back', 'Biceps', 'Abs']),
    new Exercise('Custom exercise 2', ['Quadriceps', 'Hamstrings', 'Calves']),
    new Exercise('Custom exercise 3', ['Chest', 'Back', 'Shoulder', 'Triceps'])
  );

  const selectState = {};
  [selectState.selected, selectState.setSelected] = useState(
    exercise_list[0].name
  );

  return (
    <>
      <TopNavbar />
      <Container className={styles.container}>
        <div className={styles.container}>
          <main className={styles.main}>
            <ExerciseCard
              instructions={instructions}
              link="https://www.youtube.com/embed/TwD-YGVP4Bk"
            />
            <List list={exercise_list} {...selectState} />
          </main>
        </div>
      </Container>
    </>
  );
}

const instructions = {
  1: 'Stand up straight with your torso upright. Hold a \
  dumbbell in each hand at arms-length. Your elbows should be close to your \
  torso.',
  2: 'The palms of your hands should be facing your torso. \
  This is the starting position for the exercise.',
  3: 'Curl the weight forward while contracting your biceps. Your upper \
  arm should remain stationary. Continue to lift the weight until your biceps \
  are fully contracted and the dumbbell is at shoulder level. Hold the \
  contraction for a moment as you squeeze your biceps.',
  4: 'Inhale and slowly start to bring the dumbbells back to the \
  starting position.',
  5: 'Repeat for the desired number of reps.',
};
