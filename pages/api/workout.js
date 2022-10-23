export default function handler(req, res) {
  const { body } = req;

  /* Defaults for data that somehow passes client-side validation that are empty */
  if (!body.imgSrc) {
    body.imgSrc = '/images/push-ups.png';
  }

  if (!body.imgAlt) {
    body.imgAlt = `Diagram for how to perform a ${body.name}`;
  }

  if (!body.name || !body.muscleGroups || !body.exercises) {
    return res.status(400).json({ data: 'Required fields not found.' });
  }

  return res.status(200).json({ data: req.body });
}
