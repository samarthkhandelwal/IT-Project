class Workout {
  /**
   * A class to represent Workouts.
   * @param {String} name
   * @param {[String]} muscleGroups
   * @param {String} id
   */
  constructor(name, muscleGroups, id) {
    this.name = name;
    this.muscleGroups = muscleGroups;
    this.id = id;
    this.imgSrc =
      'https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    this.imgAlt = 'A man doing a bench press.';
  }
}

export default Workout;
