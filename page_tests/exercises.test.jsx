// React
import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

// Custom components
import List from '../components/List/List';

// Styles
import styles from '../styles/Exercises.module.css';

// Import the Exercise class so that we can create a dummy set of exercises to render
import Exercise from '../public/classes/Exercise';

function ExercisesTest() {
  // A dummy exercise list so that we have data to render.
  // Once the database is implemented this will not be necessary
  const exerciseList = [];
  exerciseList.push(
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
  [selectState.selected, selectState.setSelected] = useState();

  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <List list={exerciseList} {...selectState} />
        </main>
      </div>
    </>
  );
}

describe('The List of buttons displaying Workouts or Exercises', () => {
  it('Updates the selected button when another is clicked', () => {
    render(<ExercisesTest />);

    const btns = screen.getAllByRole('radio');

    btns.forEach((btn1) => {
      fireEvent.click(btn1);
      expect(btn1.checked).toBeTruthy();

      btns.forEach((btn2) => {
        if (btn1 !== btn2) {
          expect(btn2.checked).toBeFalsy();
        }
      });
    });
  });
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
