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
      'https://images.pexels.com/photos/2204196/pexels-photo-2204196.jpeg';
    this.imgAlt = 'A man doing a bench press.';
  }
}
