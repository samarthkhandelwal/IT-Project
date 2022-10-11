// React
import React, { useState } from 'react';

// Bootstrap components
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

// Custom components
import SearchFilterBar from './SearchFilterBar';
import Element from './Element';
import styles from '../../styles/List.module.css';

/**
 *
 * @param {*} list A list of either workouts or exercises
 * @param {*} listType Either "radio" or "checkbox".
 * @param {*} selected State of which elements are selected. if checkbox, must be an array.
 * @param {*} setSelected The function that sets the state of selected
 * @returns
 */
export default function List({ list, listType, selected, setSelected }) {
  // A function to handle when a new element is selected
  const handleChange = (e) => {
    setSelected(e);
  };

  // State to keep track of the search input
  const [searchInput, setSearchInput] = useState('');

  // When searchInput is changed, filteredList updates to only contain elements with names including searchInput
  const filteredList = list.filter((item) => {
    if (searchInput === '') {
      return item;
    }
    return item.name.toLowerCase().includes(searchInput);
  });

  return (
    <div className={styles.container}>
      <SearchFilterBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      {/* The list. A group of toggle buttons, so that the active one can be kept track of */}
      <div className={styles.scrollableContainer}>
        <ToggleButtonGroup
          type={listType}
          value={selected}
          onChange={handleChange}
          vertical
          name="button-list"
        >
          {filteredList.map((element) => (
            <ToggleButton
              className={styles.list}
              key={element.name}
              id={`${listType}-${element.name}`}
              variant="light"
              name={listType}
              value={element.name}
            >
              <Element element={element} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
