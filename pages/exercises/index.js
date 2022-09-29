// Import React
import React, { useState, useEffect } from 'react';

// Bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Custom Components
import ExerciseElement from '../../components/ExerciseElement/ExerciseElement';
import TopNavbar from '../../components/Navbar/Navbar';
import Video from '../../components/Video/Video';

// Styles
import styles from '../../styles/List.module.css';

export default function ExercisesPage() {
  const exerciseList = [];

  for (let id in exercises) {
    exerciseList.push(exercises[id]);
  }

  // State of the image that is displayed as the favourite button
  const [selectedExercise, setExercise] = useState(exerciseList[0]);

  // Event handler if the exercise element is clicked on
  const selectExercise = (id) => {
    setExercise(exerciseList[id]);
  };

  /* Only render Card if innerWidth > 576px (small breakpoint) */
  const [toRenderCard, setRenderCard] = useState(true);
  useEffect(() => {
    if (window.innerWidth < 576) {
      setRenderCard(false);
    }
  }, []);

  function Card() {
    if (toRenderCard) {
      return (
        <Col xs={6}>
          <div className={styles.scrollableContainer}>
            <h2>{selectedExercise.name}</h2>
            <Video link={selectedExercise.videoURL} />
            {selectedExercise.instructions.map((step, index) => (
              <p key={index}>
                Step {index + 1}: {step}
              </p>
            ))}
          </div>
        </Col>
      );
    }
  }

  return (
    <>
      <TopNavbar />
      <div className={styles.main}>
        <Row>
          <Card />
          <Col>
            <div className={styles.scrollableContainer}>
              {exerciseList.map((element) => (
                <ExerciseElement
                  exercise={element}
                  updateCard={selectExercise}
                  key={element.id}
                />
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

// Static content (to be replaced once database is set up)
const exercises = [
  {
    id: 0,
    name: 'Hammer Curl',
    muscleGroups: ['Upper arm', 'Lower arm'],
    imgSrc: '/../public/images/hammer-curls.png',
    imgAlt: 'Hammer curl positions',
    instructions: [
      'Stand up straight with your torso upright. Hold a dumbbell in each hand \
      at arms-length. Your elbows should be close to your torso.',
      'The palms of your hands should be facing your torso. This is the \
      starting position for the exercise.',
      'Curl the weight forward while contracting your biceps. Your upper arm \
      should remain stationary. Continue to lift the weight until your biceps \
      are fully contracted and the dumbbell is at shoulder level. Hold the \
      contraction for a moment as you squeeze your biceps.',
      'Inhale and slowly start to bring the dumbbells back to the starting \
      position.',
      'Repeat for the desired number of reps.',
    ],
    videoURL: 'https://www.youtube.com/embed/TwD-YGVP4Bk',
  },
  {
    id: 1,
    name: 'Plank',
    muscleGroups: ['Quadriceps', 'Hamstrings', 'Core', 'Triceps', 'Glutes'],
    imgSrc: '/../public/images/hammer-curls.png',
    imgAlt: 'Performing a plank',
    instructions: [
      'Lie face down with your forearms on the floor, and your elbows \
      directly underneath your shoulders. Your forearms should be parallel. \
      Point your feet so that your toes are on the floor.',
      'Lift your body up by engaging your core, so that only your toes and \
      forearms are touching the ground. Your spine and legs should be straight.',
      'Hold this position for 30 seconds. Then, release and bring your \
      knees to the ground.',
    ],
    videoURL: 'https://www.youtube.com/embed/wCBOqf-HrTI',
  },
];
