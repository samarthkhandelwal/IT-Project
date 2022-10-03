// Bootstrap components
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

// Custom components
import SearchFilterBar from './SearchFilterBar';
import Element from './Element';

// Styles
import styles from '../../styles/List.module.css';

export default function List({ list, selected, setSelected }) {
  const onchange = (e) => {
    setSelected(e);
  };

  return (
    <div>
      <SearchFilterBar />

      {/* The list. A group of toggle buttons, so that the active one can be kept track of*/}
      <div className={styles.scrollableContainer}>
        <ToggleButtonGroup
          value={selected}
          onChange={onchange}
          variant="primary"
          vertical
          name="button-list"
        >
          {list.map((element) => (
            <ToggleButton
              className={styles.list}
              key={element.name}
              id={`radio-${element.name}`}
              type="radio"
              name="radio"
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
