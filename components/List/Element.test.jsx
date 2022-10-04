// React
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

// Custom components
import Element from './Element';
import Workout from '../../public/classes/Workout';

const toggleImgPath = (src) =>
  src.includes('star.png') ? '/images/starFilled.png' : '/images/star.png';

describe('The Favourite button', () => {
  it('Toggles on and off when clicked', () => {
    const element = new Workout('Pull Workout', ['Back', 'Biceps', 'Abs']);
    render(<Element element={element} />);

    const favBtn = screen.getByRole('button');
    let expectedImgPath = toggleImgPath(favBtn.getAttribute('src'));

    fireEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', expectedImgPath);

    expectedImgPath = toggleImgPath(favBtn.getAttribute('src'));
    fireEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', expectedImgPath);
  });
});
