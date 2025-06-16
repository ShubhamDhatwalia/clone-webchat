import axios from 'axios';
import chat from '../../models/chat.js';


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

    socket.on('sendTextMessage', async (payload) => {

      try {
        const res = await sendTextMessage(payload);
        const messageId = res.data.messages.map((m) => m.id);


        const updatedPayload = {
          ...payload,
          messageId,
          timestamp: Math.floor(Date.now() / 1000).toString(),
        };


        const chatDoc = new chat({
          message: updatedPayload,
          messageType: 'sent',
        });

        io.emit('newMessage', chatDoc);

        try {
          await chatDoc.save();
        } catch (err) {
          console.log('Error saving message:', err)
        }

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
        const res = await sendTemplateMessages(payload);
        console.log(res.data);

        const messageId = res.data.messages.map((m) => m.id);


        const updatedPayload = {
          ...payload,
          messageId,
          timestamp: Math.floor(Date.now() / 1000).toString(),
        };


        const chatDoc = new chat({
          message: updatedPayload,
          messageType: 'sent',
        });


        io.emit('newTemplateMessage', chatDoc);
        try {
          await chatDoc.save();
        } catch (err) {
          console.log('Error saving message:', err)
        }

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
