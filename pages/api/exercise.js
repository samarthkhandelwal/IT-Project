export default function handler(req, res) {
  const { body } = req;
  if (!body.equipment) {
    body.equipment = 'Not required.';
  }

  if (!body.name) {
    return res.status(400).json({ error: 'Name of exercise is required.' });
  }

  if (!body.videoURL) {
    return res.status(400).json({ error: 'Video URL is required.' });
  }

  if (!body.instructions) {
    return res.status(400).json({ error: 'Instructions are required.' });
  }

  if (!body.imgSrc) {
    return res.status(400).json({ error: 'Image source required' });
  }

  if (!body.imgAlt) {
    body.imgAlt = `Performing a ${body.name}`;
  }

  return res.status(200).json({ data: req.body });
}
