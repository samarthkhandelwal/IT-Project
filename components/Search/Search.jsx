
// React
import React from 'react';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// Styles
import styles from '../../styles/Search.module.css';


export default function SearchBar() {
  return (
    <Container fluid className={styles.container}>
      <Row>
        <Col xs>
          <Form>
            <Form.Control type="search" placeholder="Search" />
          </Form>
        </Col>
        <Col xs>
          <DropdownButton title="Filter" bsPrefix={styles.filter}>
            <Dropdown.Item href="#/action-1">Item 1</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Item 2</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Item 3</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
    </Container>
  );
}
