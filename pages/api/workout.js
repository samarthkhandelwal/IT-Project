export default function handler(req, res) {
  const { body } = req;

  /* Defaults for data that somehow passes client-side validation that are empty */
  if (!body.imgSrc) {
    body.imgSrc = '/images/push-ups.png';
  }

  if (!body.imgAlt) {
    body.imgAlt = `Diagram for how to perform a ${body.name}`;
  }

  if (!body.muscleGroups) {
    body.muscleGroups = [];
  }

  /* Cannot have workouts without a name or exercises */
  if (!body.name) {
    return res.status(400).json({ error: 'Workout name required.' });
  }

  if (body.exercises.length < 1) {
    return res.status(400).json({ error: 'Workout contains no exercises.' });
  }

  return res.status(200).json({ data: req.body });
}
