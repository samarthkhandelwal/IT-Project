import SearchFilterBar from "./SearchFilterBar";
import Element from "./Element";
import styles from "../../styles/List.module.css";

// React Bootstrap Components
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

/**
 * 
 * @param {*} list A list of either workouts or exercises
 * @param {*} listType Either "radio" or "checkbox".
 * @param {*} selected State of which elements are selected. if checkbox, must be an array.
 * @param {*} setSelected The function that sets the state of selected
 * @returns 
 */
export default function List({ list, listType, selected, setSelected }) {
  const handleChange = (e) => {
    setSelected(e);
  };

  return (
    <div className={styles.container}>
      <SearchFilterBar />

      {/* The list, A group of toggle buttons*/}
      <div className={styles.scrollableContainer}>
        <ToggleButtonGroup
          type={listType}
          value={selected}
          onChange={handleChange}
          vertical
          name="button-list"
        >
          {list.map((element) => (
            <ToggleButton
              key={element.name}
              id={`${listType}-${element.name}`}
              variant="light"
              name={listType}
              value={element.name}
            >
              <Element element={element} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
