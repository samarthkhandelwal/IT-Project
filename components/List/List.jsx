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
 *
 * @param {*} list A list of either workouts or exercises
 * @param {*} listType Either "radio" or "checkbox".
 * @param {*} selected State of which elements are selected. if checkbox, must be an array.
 * @param {*} setSelected The function that sets the state of selected
 * @param {*} type Either "exercises" or "workouts"
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

  // When searchInput is changed, filteredList updates to only contain elements with names including searchInput
  const filteredList = list.filter((item) => {
    if (searchInput === '') {
      return item;
    }
    return item.name.toLowerCase().includes(searchInput);
  });

  return (
    <div>
      <SearchFilterBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <div className={styles.scrollableContainer}>
        <ToggleButtonGroup
          type={listType}
          value={selected}
          onChange={handleChange}
          vertical
          name="button-list"
        >
          {filteredList.length === 0 ? (
            <h3>No {type} available</h3>
          ) : (
            filteredList.map((element) => (
              <ToggleButton
                className={styles.list}
                key={element.id}
                id={`${listType}-${element.id}`}
                name={listType}
                value={element}
              >
                {selected.name === element.name ? (
                  <SelectedElement
                    element={element}
                    type={type}
                    onDelete={onDelete}
                  />
                ) : (
                  <Element element={element} type={type} onDelete={onDelete} />
                )}
              </ToggleButton>
            ))
          )}
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
