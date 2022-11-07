export const exercises = [];
exercises.push({
  imgSrc:
    'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  muscleGroups: ['Biceps'],
  equipment: 'Barbell',
  videoURL: 'https://www.youtube.com/watch?v=kwG2ipFRgfo',
  instructions:
    'Step 1: Stand up straight while holding a barbell in a shoulder-width grip.\nStep 2: Contract your biceps to curl the weight forward. Your upper arms should remain stationary during this process.\nStep 3: Continue moving the barbell until the biceps are fully contracted and the bar is at shoulder height. Hold this position for a second and then squeeze your biceps.\nStep 4: Bring the barbell back to the starting position. Repeat for the desired number of reps.',
  imgAlt: 'Barbell Curl',
  name: 'Barbell Curl',
  id: '6BXWzIfDOySrwrc0kvqX',
});
exercises.push({
  equipment: 'Bench, Barbell',
  imgAlt: 'Bench Press',
  instructions:
    'Step 1: Lie on your back on a flat bench. Lift the bar off the rack and hold it straight over you, keeping your arms locked. This is the starting position.\nStep 2: Next, inhale and bring the barbell down in a slow and controlled manner until it reaches your mid-chest.\nStep 3: Pause briefly before raising the barbell back to your starting position as you exhale. Your focus should be on using your chest muscles to move the bar. Lock your arms at the top of the movement and squeeze your chest before slowly bringing the barbell down again. This step should take twice as long raising the weight to get the maximum benefit.\nStep 4: Repeat the movement for the desired number of repetitions.\nStep 5: The final step in the exercise is to place the barbell on the rack.',
  imgSrc:
    'https://images.pexels.com/photos/3837757/pexels-photo-3837757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  muscleGroups: ['Pecs', 'Triceps', 'Deltoids'],
  videoURL: 'https://www.youtube.com/watch?v=vcBig73ojpE',
  name: 'Bench Press',
  id: 'opPAV47UZbG0i4haC8tD',
});
exercises.push({
  videoURL: 'https://www.youtube.com/watch?v=2C-uNgKwPLE',
  muscleGroups: ['Hamstrings', 'Glutes', 'Quadriceps', 'Calves'],
  name: 'Bulgarian Split Squats',
  equipment: 'Barbell',
  imgAlt: 'Performing a Bulgarian Split Squats',
  imgSrc:
    'https://images.pexels.com/photos/3076514/pexels-photo-3076514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  instructions:
    'Step 1: Place a barbell across upper back with an overhand grip and feet in a staggered stance with left foot forward.\nStep 2: Place your back right foot on a 6-inch box. Begin exercise by lowering body straight down until your back knee almost touches the ground. Pause, then push yourself back up to starting position.\nStep 3: Repeat prescribed reps with same leg, then switch legs.',
  id: 'tKcp5tIWZuGaiDzzeuA8',
});
exercises.push({
  equipment: 'Dumbbells',
  imgAlt: 'Man doing hammer curls whilst looking in the mirror',
  muscleGroups: ['Biceps'],
  instructions:
    'Step 1: Stand up straight with your torso upright. Hold a dumbbell in each hand at arms-length. Your elbows should be close to your torso.\nStep 2: The palms of your hands should be facing your torso. This is the starting position for the exercise.\nStep 3: Curl the weight forward while contracting your biceps. Your upper arm should remain stationary. Continue to lift the weight until your biceps are fully contracted and the dumbbell is at shoulder level. Hold the contraction for a moment as you squeeze your biceps.\nStep 4: Inhale and slowly start to bring the dumbbells back to the starting position.\nStep 5: Repeat for the desired number of reps.',
  imgSrc: 'https://images.pexels.com/photos/6550855/pexels-photo-6550855.jpeg',
  videoURL: 'https://www.youtube.com/watch?v=TwD-YGVP4Bk&t=10s',
  name: 'Hammer Curl',
  id: 'CTqGCyS83x18NPoefzff',
});
exercises.push({
  imgSrc: 'https://images.pexels.com/photos/7592988/pexels-photo-7592988.jpeg',
  instructions:
    'Lie face down with your forearms on the yoga mat, and your elbows directly underneath your shoulders. Your forearms should be parallel. Point your feet so that your toes are on the floor. Lift your body up by engaging your core, so that only your toes and forearms are touching the ground. Your spine and legs should be straight. Hold this position for 30 seconds. Then, release and bring your knees to the ground.',
  videoURL: 'https://www.youtube.com/embed/wCBOqf-HrTI',
  muscleGroups: [
    'Core',
    'Abs',
    'Deltoids',
    'Spinal erectors',
    'Traps',
    'Rhomboids',
    'Pecs',
    'Glutes',
    'Quadriceps',
  ],
  equipment: 'Yoga mat',
  imgAlt: 'Woman doing a plank on a yoga mat',
  name: 'Plank',
  id: 'mXpkgyp79C7CBpGsVdAX',
});
exercises.push({
  muscleGroups: [
    'Biceps',
    'Shoulders',
    'Chest',
    'Pecs',
    'Deltoids',
    'Abs',
    'Lats',
    'Traps',
  ],
  instructions:
    'Stand directly below the pull-up bar. Place your hands on the bars in an overhand grip (with the palms of your hands facing away from you). If you cannot reach the bar, place a box below your feet so that you can reach the bar. When you are ready, lift your feet off the ground, and engage your core. Using the muscles in your arms and back, lift your body up until your chin is over the bar. As you do this, avoid swinging your legs or shrugging your shoulders. You want to ensure that your shoulder blades remain back and down throughout the pull-up. Lastly, lower your body back down to the starting position and repeat.',
  imgAlt: 'Man in black top holding a black pull-up bar',
  equipment: 'Pull-up bar',
  videoURL: 'https://www.youtube.com/embed/30NjUye3y6Q',
  name: 'Pull-up',
  imgSrc: 'https://images.pexels.com/photos/7187945/pexels-photo-7187945.jpeg',
  id: '1pbq9253BdtvG7Jhwz0G',
});

export const workouts = [];
workouts.push({
  name: 'Push Workout',
  imgSrc: 'https://images.pexels.com/photos/4920476/pexels-photo-4920476.jpeg',
  exercises: [
    {
      index: 0,
      name: 'Plank',
      reps: '45',
      imgAlt: 'Woman doing a plank on a yoga mat',
      id: 'mXpkgyp79C7CBpGsVdAX',
      imgSrc:
        'https://images.pexels.com/photos/7592988/pexels-photo-7592988.jpeg',
      sets: '3',
    },
    {
      index: 1,
      imgAlt: 'Man in black top holding a black pull-up bar',
      name: 'Pull-up',
      reps: '15',
      imgSrc:
        'https://images.pexels.com/photos/7187945/pexels-photo-7187945.jpeg',
      id: '1pbq9253BdtvG7Jhwz0G',
      sets: '5',
    },
  ],
  muscleGroups: ['Chest', 'Shoulder', 'Triceps'],
  id: '0',
});
workouts.push({
  name: 'Pull Workout',
  imgSrc: 'https://images.pexels.com/photos/4920476/pexels-photo-4920476.jpeg',
  exercises: [
    {
      index: 0,
      name: 'Plank',
      reps: '45',
      imgAlt: 'Woman doing a plank on a yoga mat',
      id: 'mXpkgyp79C7CBpGsVdAX',
      imgSrc:
        'https://images.pexels.com/photos/7592988/pexels-photo-7592988.jpeg',
      sets: '3',
    },
    {
      index: 1,
      imgAlt: 'Man in black top holding a black pull-up bar',
      name: 'Pull-up',
      reps: '15',
      imgSrc:
        'https://images.pexels.com/photos/7187945/pexels-photo-7187945.jpeg',
      id: '1pbq9253BdtvG7Jhwz0G',
      sets: '5',
    },
  ],
  muscleGroups: ['Back', 'Biceps', 'Abs'],
  id: '1',
});
workouts.push({
  name: 'Legs Workout',
  imgSrc: 'https://images.pexels.com/photos/4920476/pexels-photo-4920476.jpeg',
  exercises: [
    {
      index: 0,
      name: 'Plank',
      reps: '45',
      imgAlt: 'Woman doing a plank on a yoga mat',
      id: 'mXpkgyp79C7CBpGsVdAX',
      imgSrc:
        'https://images.pexels.com/photos/7592988/pexels-photo-7592988.jpeg',
      sets: '3',
    },
    {
      index: 1,
      imgAlt: 'Man in black top holding a black pull-up bar',
      name: 'Pull-up',
      reps: '15',
      imgSrc:
        'https://images.pexels.com/photos/7187945/pexels-photo-7187945.jpeg',
      id: '1pbq9253BdtvG7Jhwz0G',
      sets: '5',
    },
  ],
  muscleGroups: ['Quadriceps', 'Hamstrings', 'Calves'],
  id: '2',
});
workouts.push({
  name: 'Upper Workout',
  imgSrc: 'https://images.pexels.com/photos/4920476/pexels-photo-4920476.jpeg',
  exercises: [
    {
      index: 0,
      name: 'Plank',
      reps: '45',
      imgAlt: 'Woman doing a plank on a yoga mat',
      id: 'mXpkgyp79C7CBpGsVdAX',
      imgSrc:
        'https://images.pexels.com/photos/7592988/pexels-photo-7592988.jpeg',
      sets: '3',
    },
    {
      index: 1,
      imgAlt: 'Man in black top holding a black pull-up bar',
      name: 'Pull-up',
      reps: '15',
      imgSrc:
        'https://images.pexels.com/photos/7187945/pexels-photo-7187945.jpeg',
      id: '1pbq9253BdtvG7Jhwz0G',
      sets: '5',
    },
  ],
  muscleGroups: ['Chest', 'Back', 'Shoulder', 'Triceps'],
  id: '3',
});

const photo = '../public/profile-pic.jpg';

export const userAuth = {
  uid: '12',
  name: 'John Doe',
  email: 'jdoe@gmail.com',
  photoURL: photo,
  role: 0,
  favouriteWorkouts: ['5', '7'],
  favouriteExercises: ['CTqGCyS83x18NPoefzff', 'opPAV47UZbG0i4haC8tD'],
};
