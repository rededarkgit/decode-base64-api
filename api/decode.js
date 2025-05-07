export const config = {
  api: {
    bodyParser: false, // importante para aceitar binário
  },
};

export default async function handler(req, res) {
  try {
    const chunks = [];

    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'inline; filename="image.png"');
    res.status(200).send(buffer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to decode image', details: error.message });
  }
}
