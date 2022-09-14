import styles from "../../styles/List.module.css";

// React Bootstrap Components
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

export default function List({ list, selected, setSelected }) {
  return (
    <div>
      {/* The Search and Filter Form */}
      <InputGroup className="mb-3">
        <Form.Control aria-label="First name" placeholder="Search" />
        <Form.Control aria-label="Last name" placeholder="Filter" />
      </InputGroup>

      {/* The list. A group of toggle buttons, so that */}
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
                <img src={element.imgSrc} className={styles.photo} />
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
