// React
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

// Custom components
import Element from './Element';

// Test Data
import { workouts, userAuth } from '../../testData/testData';

const toggleImgPath = (src) =>
  src.includes('star.png') ? '/images/starFilled.png' : '/images/star.png';

describe('The Favourite button', () => {
  it('Toggles on and off when clicked', () => {
    const element = workouts[0];
    render(<Element element={element} type="workouts" testAuth={userAuth} />);

    const favBtn = screen.getByTitle('favourite');
    let expectedImgPath = toggleImgPath(favBtn.getAttribute('src'));

    fireEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', expectedImgPath);

    expectedImgPath = toggleImgPath(favBtn.getAttribute('src'));
    fireEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', expectedImgPath);
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
