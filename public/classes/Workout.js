/**
 * A class to represent Workouts. May not be necessary once we have objects from Firebase. We shall see.
 */
class Workout {
  /**
   *
   * @param {String} name
   * @param {[String]} muscle_groups
   */
  constructor(name, muscle_groups) {
    this.name = name;
    this.muscle_groups = muscle_groups;
  }
}

export default Workout;
