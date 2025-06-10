// controllers/messageController.js
import axios from 'axios';

export async function sendTextMessage(payload) {
  return await axios.post(
    `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );
}



export async function sendTemplateMessages(req, res) {
  const { to, template } = req.body;

  const url = `https://graph.facebook.com/v22.0/${process.env.PHONE_NUMBER_ID}/messages`;

  const data = {
    messaging_product: 'whatsapp',
    to,
    type: 'template',
    template
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Template sent:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Failed to send template:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
}
