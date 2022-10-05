// React
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import List from './List';
import Workout from '../../public/classes/Workout';

// Dummy data to render in List component
const workoutList = [];
workoutList.push(
  new Workout('Push Workout', ['Chest', 'Shoulder', 'Triceps']),
  new Workout('Pull Workout', ['Back', 'Biceps', 'Abs']),
  new Workout('Legs Workout', ['Quadriceps', 'Hamstrings', 'Calves']),
  new Workout('Upper Workout', ['Chest', 'Back', 'Shoulder', 'Triceps'])
);

describe('The Search Bar', () => {
  it('filters the correct items on lowercase input "pu"', () => {
    // Mock props. They are unecessary for the test
    const selected = '';
    const setSelected = jest.fn();

    const list = render(
      <List
        list={workoutList}
        selected={selected}
        setSelected={setSelected}
        type="radio"
      />
    );

    const searchInput = list.getByPlaceholderText('Search');
    expect(searchInput.value).toBe('');

    // Type 'pu' into the search bar
    fireEvent.change(searchInput, { target: { value: 'pu' } });

    const items = list.getAllByRole('radio');

    // Expect only 'Push Workout' and 'Pull Workout to remain
    expect(items.length).toBe(2);
    expect(items[0].getAttribute('value') === 'Push Workout').toBeTruthy();
    expect(items[1].getAttribute('value') === 'Pull Workout').toBeTruthy();
  });

  it('filters the correct items on uppercase input "P"', () => {
    // Mock props. They are unecessary for the test
    const selected = '';
    const setSelected = jest.fn();

    const list = render(
      <List
        list={workoutList}
        selected={selected}
        setSelected={setSelected}
        type="radio"
      />
    );

    const searchInput = list.getByPlaceholderText('Search');
    expect(searchInput.value).toBe('');

    // Type 'P' into the search bar
    fireEvent.change(searchInput, { target: { value: 'P' } });

    const items = list.getAllByRole('radio');

    // Expect only 'Push Workout' and 'Pull Workout to remain
    expect(items.length).toBe(3);
    expect(items[0].getAttribute('value') === 'Push Workout').toBeTruthy();
    expect(items[1].getAttribute('value') === 'Pull Workout').toBeTruthy();
    expect(items[2].getAttribute('value') === 'Upper Workout').toBeTruthy();
  });

  it('filters the correct items on mixed case input "wOrK"', () => {
    // Mock props. They are unecessary for the test
    const selected = '';
    const setSelected = jest.fn();

    const list = render(
      <List
        list={workoutList}
        selected={selected}
        setSelected={setSelected}
        type="radio"
      />
    );

    const searchInput = list.getByPlaceholderText('Search');
    expect(searchInput.value).toBe('');

    // Type 'wOrK' into the search bar
    fireEvent.change(searchInput, { target: { value: 'wOrK' } });

    const items = list.getAllByRole('radio');

    // Expect only 'Push Workout' and 'Pull Workout to remain
    expect(items.length).toBe(4);
    expect(items[0].getAttribute('value') === 'Push Workout').toBeTruthy();
    expect(items[1].getAttribute('value') === 'Pull Workout').toBeTruthy();
    expect(items[2].getAttribute('value') === 'Legs Workout').toBeTruthy();
    expect(items[3].getAttribute('value') === 'Upper Workout').toBeTruthy();
  });
});
