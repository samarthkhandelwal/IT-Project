import Link from "next/link";
import styles from "../../styles/List.module.css";
import React, { useState } from 'react';

// React Bootstrap Components
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";

export default function List({ list }) {
  const [selected, setSelected] = useState(list[0].name);

  return (
    <div className={styles.container}>
      <InputGroup className="mb-3">
        <Form.Control aria-label="First name" placeholder="Search" />
        <Form.Control aria-label="Last name" placeholder="Filter"/>
      </InputGroup>

      <ButtonGroup vertical>
        {list.map((element) => (
          <ToggleButton className={styles.element}
            key={element.name}
            id={`radio-${element.name}`}
            type="radio"
            variant="light"
            name="radio"
            value={element.name}
            checked={selected === element.name}
            onChange={(e) => setSelected(e.currentTarget.value)}
          >
            <div>
              <img src={element.imgSrc} className={styles.photo}/>
            </div>
            
            <div>
              <h1>{element.name}</h1>
              <p>{element.muscleGroups.join(", ")}</p>
            </div>
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  );
}
