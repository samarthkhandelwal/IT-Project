// React
import React from 'react';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// Styles
import styles from '../../styles/Search.module.css';

export default function SearchFilterBar({
  setFilterInput,
  setSearchInput,
  muscleGroups,
}) {
  // Function to handle when the search input changes
  const handleSearchInput = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchInput(lowerCase);
  };

  const handleFilterInput = (e) => {
    setFilterInput(e.target.value);
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        aria-label="First name"
        placeholder="Search"
        onChange={handleSearchInput}
        className={styles.filter}
      />

      <Form.Select
        aria-label="Default select example"
        className={styles.filter}
        onChange={handleFilterInput}
      >
        <option>Filter</option>
        {muscleGroups.map((muscleGroup) => (
          <option key={muscleGroup}>{muscleGroup}</option>
        ))}
      </Form.Select>
    </InputGroup>
  );
}
