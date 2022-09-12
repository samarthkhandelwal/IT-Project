// Bootstrap components
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';

// Styles
import styles from '../../styles/Search.module.css'

function SearchBar() {
  return (
    <>
      <Container fluid className={styles.container}>
        <Row>
          <Col xs>
            <Form>
              <Form.Control type="search" placeholder="Search for exercises"/>
            </Form>
          </Col>
          <Col xs="auto">
            <Dropdown>
              <Dropdown.Toggle variant="success">Filter</Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Filter1</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Filter2</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Filter3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SearchBar;