/**
 * A class to represent Workouts. May not be necessary once we have objects from Firebase. We shall see.
 */
class Workout {
  /**
   *
   * @param {String} name
   * @param {[String]} muscleGroups
   */
  constructor(name, muscleGroups) {
    this.name = name;
    this.muscleGroups = muscleGroups;
    this.imgSrc =
      "https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    this.imgAlt = "A man doing a bench press.";
  }
}

const workout_list = [];
workout_list.push(
  new Workout("Push Workout", ["Chest", "Shoulder", "Triceps"])
);
workout_list.push(new Workout("Pull Workout", ["Back", "Biceps", "Abs"]));
workout_list.push(
  new Workout("Legs Workout", ["Quadriceps", "Hamstrings", "Calves"])
);
workout_list.push(
  new Workout("Upper Workout", ["Chest", "Back", "Shoulder", "Triceps"])
);
workout_list.push(
  new Workout("Push Workout 2", ["Chest", "Shoulder", "Triceps"])
);
workout_list.push(new Workout("Pull Workout 2", ["Back", "Biceps", "Abs"]));
workout_list.push(
  new Workout("Legs Workout 2", ["Quadriceps", "Hamstrings", "Calves"])
);
workout_list.push(
  new Workout("Upper Workout 2", ["Chest", "Back", "Shoulder", "Triceps"])
);

export default workout_list;
