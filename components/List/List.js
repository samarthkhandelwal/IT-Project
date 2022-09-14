import styles from "../../styles/List.module.css";
import Image from "next/image";

// React Bootstrap Components
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

export default function List({ list, selected, setSelected }) {
  return (
    <div>
      {/* The Search and Filter Form */}
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

      {/* The list. A group of toggle buttons, so that the active one can be kept track of*/}
      <div className={styles.container}>
        <ToggleButtonGroup vertical name="bob">
          {list.map((element) => (
            <ToggleButton
              key={element.name}
              id={`radio-${element.name}`}
              type="radio"
              variant="light"
              name="radio"
              value={element.name}
              checked={selected === element.name}
              onChange={(e) => setSelected(e.currentTarget.value)}
            >
              <div className={styles.element}>
                <Image
                  src={element.imgSrc}
                  className={styles.photo}
                  alt={element.imgAlt}
                  height={84}
                  width={120}
                />
                <div className={styles.txt}>
                  <h1>{element.name}</h1>
                  <p>{element.muscleGroups.join(", ")}</p>
                </div>
              </div>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
