// React
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

// Custom Components
import ExercisesTest from './ExercisesTest';

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
