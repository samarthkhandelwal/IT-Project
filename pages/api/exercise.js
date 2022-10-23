export default function handler(req, res) {
  const { body } = req;
  if (!body.equipment) {
    body.equipment = 'Not required.';
  } else if (!body.imgSrc) {
    body.imgSrc = '/images/hammer-curls.png';
    body.imgAlt = `Diagram for how to perform a ${body.name}`;
  }

  if (
    !body.name ||
    !body.muscleGroups ||
    !body.videoURL ||
    !body.instructions
  ) {
    return res.status(400).json({ data: 'Required fields not found.' });
  }

  return res.status(200).json({ data: req.body });
}
