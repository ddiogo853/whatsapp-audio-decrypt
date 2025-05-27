// pages/api/decrypt.js
export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed, use POST' });
	}

	const { url, mediaKey, mimetype } = req.body;

	if (!url || !mediaKey || !mimetype) {
		return res.status(400).json({ error: 'Missing required fields: url, mediaKey, mimetype' });
	}

	// Aqui entra a lógica de descriptografia (placeholder)
	return res.status(200).json({
		status: 'success',
		message: 'Recebido com sucesso!',
		dados: { url, mediaKey, mimetype },
	});
}
