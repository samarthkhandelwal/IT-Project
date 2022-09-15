import React from "react";

// Bootstrap components
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

export default function SearchFilterBar() {
  return (
    <InputGroup className="mb-3">
      <Form.Control aria-label="First name" placeholder="Search" />

      <Dropdown as={ButtonGroup}>
        <Button variant="primary">Filter</Button>

        <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

        <Dropdown.Menu>
          <Dropdown.Item>Chest</Dropdown.Item>
          <Dropdown.Item>Back</Dropdown.Item>
          <Dropdown.Item>Hamstrings</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </InputGroup>
  );
}
