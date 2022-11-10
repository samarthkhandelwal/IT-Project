/* eslint-disable no-nested-ternary */
// React
import React, { useState } from 'react';

// Bootstrap components
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

// Custom components
import SearchFilterBar from './SearchFilterBar';
import Element from './Element';
import styles from '../../styles/List.module.css';
import SelectedElement from './SelectedElement';

/**
 * Displays a list of exercises or workouts.
 * @param {*} list A list of either workouts or exercises
 * @param {*} listType Either "radio" or "checkbox".
 * @param {*} selected State of which elements are selected. if checkbox, must be an array.
 * @param {*} setSelected The function that sets the state of selected
 * @param {*} type Either "exercises", "workouts", or "user" (for user workouts).
 * @param {*} onDelete The callback function to handle an element being deleted from the list.
 * @returns
 */
export default function List({
  list,
  listType,
  selected,
  setSelected,
  type,
  onDelete,
}) {
  // A function to handle when a new element is selected
  const handleChange = (e) => {
    setSelected(e);
  };

  // State to keep track of the search input
  const [searchInput, setSearchInput] = useState('');

  // State to keep track of filter input
  const [filterInput, setFilterInput] = useState('');

  // State to hold which muscle groups are necessary in the filter dropdown
  const [muscleGroups, setMuscleGroups] = useState([]);
  muscleGroups.sort();

  // When searchInput is changed, filteredList updates to only contain elements with names including searchInput and musclegroups including filterInput
  const filteredList = list.filter((item) => {
    const searchFilter =
      searchInput === '' ? true : item.name.toLowerCase().includes(searchInput);
    const muscleGroupFilter =
      filterInput === '' || filterInput === 'Filter'
        ? true
        : item.muscleGroups.includes(filterInput);

    return searchFilter && muscleGroupFilter;
  });

  filteredList.forEach((element) => {
    element.muscleGroups.forEach((muscleGroup) => {
      if (!muscleGroups.includes(muscleGroup)) {
        setMuscleGroups([...muscleGroups, muscleGroup]);
      }
    });
  });

  const placeholderText = () => {
    if (filteredList.length === 0) {
      if (type === 'user') {
        return <h3>No user workouts available.</h3>;
      }

      if (type === 'workouts') {
        return <h3>No workouts available.</h3>;
      }

      if (type === 'exercises') {
        return <h3>No exercises available.</h3>;
      }
    }

    return null;
  };

  return (
    <div>
      <SearchFilterBar
        setSearchInput={setSearchInput}
        setFilterInput={setFilterInput}
        muscleGroups={muscleGroups}
      />
      <div className={styles.scrollableContainer}>
        <ToggleButtonGroup
          type={listType}
          value={selected}
          onChange={handleChange}
          vertical
          name="button-list"
        >
          {placeholderText}
          {filteredList.length !== 0 &&
            filteredList.map((element) => (
              <ToggleButton
                className={styles.list}
                key={element.id}
                id={`${listType}-${element.id}`}
                name={listType}
                value={element}
              >
                {selected && selected.name === element.name ? (
                  <SelectedElement
                    element={element}
                    type={type}
                    onDelete={onDelete}
                    onClick={handleChange}
                  />
                ) : (
                  <Element element={element} type={type} onDelete={onDelete} />
                )}
              </ToggleButton>
            ))}
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
