// React
import React from 'react';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// Styles
import styles from '../../styles/Search.module.css';

export default function SearchFilterBar({ setSearchInput }) {
  // Function to handle when the search input changes
  const handleSearchInput = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchInput(lowerCase);
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        aria-label="First name"
        placeholder="Search"
        onChange={handleSearchInput}
      />

      <Form.Select
        aria-label="Default select example"
        className={styles.filter}
      >
        <option>Filter</option>
        <option value="1">Chest</option>
        <option value="2">Back</option>
        <option value="3">Hamstrings</option>
      </Form.Select>
    </InputGroup>
  );
}
