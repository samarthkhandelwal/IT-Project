export const exercises = [];
exercises.push({
  name: 'Push Ups',
  imgSrc:
    'https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  muscleGroups: ['Biceps', 'Chest', 'Core'],
  id: '0',
});
exercises.push({
  name: 'Sit Ups',
  imgSrc:
    'https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  muscleGroups: ['Core'],
  id: '1',
});
exercises.push({
  name: 'Pull Ups',
  imgSrc:
    'https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  muscleGroups: ['Biceps', 'Shoulders'],
  id: '2',
});
exercises.push({
  name: 'Squats',
  imgSrc:
    'https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  muscleGroups: ['Legs', 'Glutes'],
  id: '3',
});

export const workouts = [];
workouts.push({
  name: 'Workout 1',
  imgSrc:
    'https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  exercises: [{ 0: [5, 10] }, { 1: [5, 10] }],
  muscleGroups: ['Biceps', 'Chest', 'Core'],
  id: '4',
});
workouts.push({
  name: 'Workout 2',
  imgSrc:
    'https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  exercises: [{ 2: [5, 10] }, { 0: [5, 10] }, { 1: [5, 10] }],
  muscleGroups: ['Biceps', 'Shoulders', 'Chest', 'Core'],
  id: '5',
});
workouts.push({
  name: 'Workout 3',
  imgSrc:
    'https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  exercises: [{ 2: [5, 10] }, { 3: [5, 10] }],
  muscleGroups: ['Biceps', 'Shoulders', 'Legs', 'Glutes'],
  id: '6',
});
workouts.push({
  name: 'Workout 4',
  imgSrc:
    'https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  exercises: [{ 1: [5, 10] }, { 3: [5, 10] }],
  muscleGroups: ['Core', 'Legs', 'Glutes'],
  id: '7',
});
workouts.push({
  name: 'Push Workout',
  imgSrc:
    'https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  exercises: [{ 0: [5, 10] }],
  muscleGroups: ['Chest', 'Shoulder', 'Triceps'],
  id: '8',
});
workouts.push({
  name: 'Pull Workout',
  imgSrc:
    'https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  exercises: [{ 2: [5, 10] }],
  muscleGroups: ['Back', 'Biceps', 'Abs'],
  id: '9',
});
workouts.push({
  name: 'Legs Workout',
  imgSrc:
    'https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  exercises: [{ 3: [5, 10] }],
  muscleGroups: ['Quadriceps', 'Hamstrings', 'Calves'],
  id: '10',
});
workouts.push({
  name: 'Upper Workout',
  imgSrc:
    'https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  exercises: [{ 2: [5, 10] }],
  muscleGroups: ['Chest', 'Back', 'Shoulder', 'Triceps'],
  id: '11',
});

const photo = '../public/profile-pic.jpg';

export const userAuth = {
  uid: '12',
  name: 'John Doe',
  email: 'jdoe@gmail.com',
  photoURL: photo,
  role: 0,
  favouriteWorkouts: ['5', '7'],
  favouriteExercises: ['0', '3'],
};
