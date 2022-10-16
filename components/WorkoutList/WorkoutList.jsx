import WorkoutElement from './WorkoutElement';
import styles from '../../styles/Workouts/WorkoutList.module.css';

// React Bootstrap Components
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function WorkoutList({ exerciseList }) {
  return (
    <div>
      {/* The list. A group of toggle buttons, so that the active one can be kept track of*/}
      <div className={styles.scrollableContainer}>
        <ButtonGroup
          // onChange={onchange}
          variant="secondary"
          vertical
          name="button-list"
        >
          {exerciseList.map((element) => (
            <Button
              className={styles.list}
              key={element.id}
              id={`radio-${element.id}`}
              value={element.id}
            >
              <WorkoutElement element={element} />
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
}
