export const config = {
  api: {
    bodyParser: false,
  },
};

import { Buffer } from 'buffer';

export default async function handler(req, res) {
  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    const base64String = buffer.toString();

    // Remove qualquer prefixo se houver (ex: "data:image/png;base64,")
    const cleanedBase64 = base64String.replace(/^data:image\/\w+;base64,/, '');

    // Decodifica para binário real
    const imageBuffer = Buffer.from(cleanedBase64, 'base64');

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'inline; filename="image.png"');
    res.status(200).send(imageBuffer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to decode base64 image', details: error.message });
  }
}
