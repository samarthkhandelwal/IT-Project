// React
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

// Custom components
import ElementTest from '../Test/ElementTest';

// Test Data
import { workouts } from '../../testData/testData';

const toggleImgPath = (src) =>
  src.includes('star.png') ? '/images/starFilled.png' : '/images/star.png';

describe('The Favourite button', () => {
  it('Toggles on and off when clicked', () => {
    const element = workouts[0];
    render(<ElementTest element={element} type="workouts" />);

    const favBtn = screen.getByRole('button');
    let expectedImgPath = toggleImgPath(favBtn.getAttribute('src'));

    fireEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', expectedImgPath);

    expectedImgPath = toggleImgPath(favBtn.getAttribute('src'));
    fireEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', expectedImgPath);
  });
});
