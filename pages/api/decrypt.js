export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Você pode acessar req.body aqui, se necessário
  return res.status(200).json({
    status: 'success',
    message: 'API /api/decrypt funcionando!',
  });
}
