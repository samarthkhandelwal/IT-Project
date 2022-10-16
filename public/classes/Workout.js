class Workout {
  /**
   * A class to represent Workouts.
   * @param {String} name
   * @param {[String]} muscleGroups
   * * @param {[String]} exercises
   */
  constructor(name, muscleGroups, exercises) {
    this.name = name;
    this.muscleGroups = muscleGroups;
    this.exercises = exercises;
    this.imgSrc =
      'https://images.pexels.com/photos/2204196/pexels-photo-2204196.jpeg';
    this.imgAlt = 'A man doing a bench press.';
  }
}

export default Workout;
