// Bootstrap components
import Container from 'react-bootstrap/Container';

// Custom Components
import ExerciseList from '../../components/ExerciseList/ExerciseList';
import TopNavbar from '../../components/Navbar/Navbar';

// Styles
import styles from '../../styles/Exercises.module.css';

export default function ExercisesPage() {
  const exercise_list = [];

  for (let id in exercisesList) {
    exercise_list.push(exercisesList[id]);
  }

  return (
    <>
      <TopNavbar />
      <Container className={styles.container}>
        <div className={styles.main}>
          <ExerciseList list={exercise_list} />
        </div>
      </Container>
    </>
  );
}

// Static content (to be replaced once database is set up)
const exercisesList = [
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
