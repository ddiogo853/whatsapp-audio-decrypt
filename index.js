import crypto from 'crypto';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Use POST.' });
  }

  const { url, mediaKey, mimetype } = req.body;

  if (!url || !mediaKey || !mimetype) {
    return res.status(400).json({ error: 'Parâmetros ausentes. Certifique-se de fornecer url, mediaKey e mimetype.' });
  }

  try {
    // Baixar o arquivo criptografado
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Falha ao baixar o arquivo.');
    }
    const encryptedBuffer = await response.buffer();

    // Descriptografar o arquivo
    const mediaKeyBuffer = Buffer.from(mediaKey, 'base64');
    const cipherKey = crypto.createHmac('sha256', mediaKeyBuffer).update('WhatsApp Media Keys').digest();
    const decipher = crypto.createDecipheriv('aes-256-cbc', cipherKey, Buffer.alloc(16, 0));
    const decryptedBuffer = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);

    // Retornar o arquivo descriptografado
    res.setHeader('Content-Type', mimetype);
    res.setHeader('Content-Disposition', 'attachment; filename="audio.ogg"');
    res.send(decryptedBuffer);
  } catch (error) {
    console.error('Erro ao processar o arquivo:', error);
    res.status(500).json({ error: 'Erro interno ao processar o arquivo.' });
  }
}
