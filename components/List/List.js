import SearchFilterBar from "./SearchFilterBar";
import Element from "./Element";
import styles from "../../styles/List.module.css";

// React Bootstrap Components
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

export default function List({ list, selected, setSelected }) {
  return (
    <div className={styles.container}>
      <SearchFilterBar />

      {/* The list. A group of toggle buttons, so that the active one can be kept track of*/}
      <div className={styles.scrollableContainer}>
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
              <Element element={element} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
