import './matchMedia';

// React
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import List from './List';

// Dummy data to render in List component
import { workouts } from '../../testData/testData';

describe('The Search Bar', () => {
  it('filters the correct items on lowercase input "pu"', () => {
    // Mock props. They are unecessary for the test
    const selected = '';
    const setSelected = jest.fn();
    const onDelete = jest.fn();

    const list = render(
      <List
        list={workouts}
        listType="radio"
        selected={selected}
        setSelected={setSelected}
        type="workouts"
        onDelete={onDelete}
      />
    );

    const searchInput = list.getByPlaceholderText('Search');
    expect(searchInput.value).toBe('');

    // Type 'pu' into the search bar
    fireEvent.change(searchInput, { target: { value: 'pu' } });

    const items = list.getAllByRole('radio');

    // Expect only 'Push Workout' and 'Pull Workout to remain
    expect(items.length).toBe(2);
    expect(items[0].getAttribute('id') === 'radio-0').toBeTruthy();
    expect(items[1].getAttribute('id') === 'radio-1').toBeTruthy();
  });

  it('filters the correct items on uppercase input "P"', () => {
    // Mock props. They are unecessary for the test
    const selected = '';
    const setSelected = jest.fn();
    const onDelete = jest.fn();

    const list = render(
      <List
        list={workouts}
        listType="radio"
        selected={selected}
        setSelected={setSelected}
        type="workouts"
        onDelete={onDelete}
      />
    );

    const searchInput = list.getByPlaceholderText('Search');
    expect(searchInput.value).toBe('');

    // Type 'P' into the search bar
    fireEvent.change(searchInput, { target: { value: 'P' } });

    const items = list.getAllByRole('radio');

    // Expect only 'Push Workout' and 'Pull Workout to remain
    expect(items.length).toBe(3);
    expect(items[0].getAttribute('id') === 'radio-0').toBeTruthy();
    expect(items[1].getAttribute('id') === 'radio-1').toBeTruthy();
    expect(items[2].getAttribute('id') === 'radio-3').toBeTruthy();
  });

  it('filters the correct items on mixed case input "wOrK"', () => {
    // Mock props. They are unecessary for the test
    const selected = '';
    const setSelected = jest.fn();
    const onDelete = jest.fn();

    const list = render(
      <List
        list={workouts}
        listType="radio"
        selected={selected}
        setSelected={setSelected}
        type="workouts"
        onDelete={onDelete}
      />
    );

    const searchInput = list.getByPlaceholderText('Search');
    expect(searchInput.value).toBe('');

    // Type 'wOrK' into the search bar
    fireEvent.change(searchInput, { target: { value: 'wOrK' } });

    const items = list.getAllByRole('radio');

    // Expect only 'Push Workout' and 'Pull Workout to remain
    expect(items.length).toBe(4);
    expect(items[0].getAttribute('id') === 'radio-0').toBeTruthy();
    expect(items[1].getAttribute('id') === 'radio-1').toBeTruthy();
    expect(items[2].getAttribute('id') === 'radio-2').toBeTruthy();
    expect(items[3].getAttribute('id') === 'radio-3').toBeTruthy();
  });
});
