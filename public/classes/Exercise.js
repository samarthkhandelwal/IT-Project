export default class Exercise {
  /**
   * A class to represent Exercise.
   * @param {String} name
   * @param {[String]} muscleGroups
   * @param {{Sets: Int, Reps: Int}} repRange
   */
  constructor(name, muscleGroups, repRange) {
    this.name = name;
    this.muscleGroups = muscleGroups;
    this.repRange = repRange;
    this.imgSrc =
      'https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    this.imgAlt = 'A man doing a bench press.';
  }
}
