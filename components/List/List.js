import SearchFilterBar from './SearchFilterBar';
import Element from './Element';
import SelectedElement from './SelectedElement';
import styles from '../../styles/List.module.css';

// React Bootstrap Components
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

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
              {selected == element.name ? (
                <SelectedElement element={element} />
              ) : (
                <Element element={element} />
              )
              }
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
