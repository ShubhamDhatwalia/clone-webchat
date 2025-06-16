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


export async function sendTemplateMessages(payload) {
  const { to, template } = payload;

  const url = `https://graph.facebook.com/v22.0/${process.env.PHONE_NUMBER_ID}/messages`;

  const data = {
    messaging_product: 'whatsapp',
    to,
    type: 'template',
    template,
  };

  return await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}




export function setupMessageSocket(io) {
  io.on('connection', (socket) => {
    console.log(`New socket connection: ${socket.id}`);

    socket.on('sendTextMessage', async (payload) => {
      console.log('Received sendTextMessage:', payload);

      try {
        const res = await sendTextMessage(payload);
        const messageId = res.data.messages.map((m) => m.id);

        console.log(res.data)

        const updatedPayload = {
          ...payload,
          messageId,
        };

        io.emit('newMessage', updatedPayload);
        console.log(' WhatsApp text message sent:', JSON.stringify(messageId));
      } catch (error) {
        console.error(' Error sending text message:', error.response?.data || error.message);
        socket.emit('messageError', {
          to: payload.to,
          error: error.response?.data || error.message,
        });
      }
    });

    socket.on('sendTemplateMessage', async (payload) => {
      console.log('Received sendTemplateMessage:', payload);

      try {
        await sendTemplateMessages(payload);
        io.emit('newTemplateMessage', payload);
        console.log(' WhatsApp template message sent.');
      } catch (error) {
        console.error(' Error sending template message:', error.response?.data || error.message);
        socket.emit('messageError', {
          to: payload.to,
          error: error.response?.data || error.message,
        });
      }
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Socket disconnected: ${socket.id}`);
    });
  });
}
