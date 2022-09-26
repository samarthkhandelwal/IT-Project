import SearchFilterBar from './SearchFilterBar';
import Element from './Element';
import styles from '../../styles/List.module.css';

// React Bootstrap Components
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

export default function List({ list, selected, setSelected }) {
  const onchange = (e) => {
    setSelected(e);
  };
  return (
    <div className={styles.container}>
      <SearchFilterBar />

      {/* The list. A group of toggle buttons, so that the active one can be kept track of*/}
      <div className={styles.scrollableContainer}>
        <ToggleButtonGroup
          value={selected}
          onChange={onchange}
          vertical
          name="button-list"
        >
          {list.map((element) => (
            <ToggleButton
              key={element.id}
              id={`radio-${element.id}`}
              type="radio"
              variant="light"
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
