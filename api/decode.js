export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.startsWith('data:image')) {
    return res.status(400).json({ error: 'Missing or invalid base64 image string' });
  }

  try {
    const base64Data = url.split(';base64,').pop();
    const binary = Buffer.from(base64Data, 'base64');

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'inline; filename="image.png"');
    res.status(200).send(binary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to decode image', details: error.message });
  }
}
