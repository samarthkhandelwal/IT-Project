import React from "react";

// Bootstrap components
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { DropdownButton } from "react-bootstrap";

export default function SearchFilterBar() {
  return (
    <InputGroup className="mb-3">
      <Form.Control aria-label="First name" placeholder="Search" />

      <Form.Select aria-label="Default select example">
        <option>Filter Muscle Group</option>
        <option value="1">Chest</option>
        <option value="2">Back</option>
        <option value="3">Hamstrings</option>
      </Form.Select>
    </InputGroup>
  );
}
