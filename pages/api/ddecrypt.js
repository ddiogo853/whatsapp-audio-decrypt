export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Missing message' });
  }

  // Simula descriptografia
  const decrypted = message.split('').reverse().join('');

  return res.status(200).json({ decrypted });
}
