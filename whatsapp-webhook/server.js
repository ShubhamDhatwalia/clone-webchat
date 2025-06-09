
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';

import connect from './database/connection.js';
import webhookRoutes from './routes/webhookRoutes.js';
import templateRoutes from './routes/templateRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import replyMaterialRoutes from './routes/replyMaterialRoutes.js';
import keywordRoutes from './routes/keywordRoutes.js';
import chatbotsRoutes from './routes/chatbotsRoutes.js';
import { sendTextMessage } from './controllers/messageController/sendTextMessage.js';



dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://clone-webchat.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true
  }
});

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'https://clone-webchat.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
}));

app.use(express.json());

// Attach routes
app.use('/', webhookRoutes);
app.use('/', templateRoutes);
app.use('/', campaignRoutes);
app.use('/', contactRoutes);
app.use('/', replyMaterialRoutes);
app.use('/', keywordRoutes);
app.use('/', chatbotsRoutes);

// Make `io` accessible in routes/middleware
app.set('io', io);


io.on('connection', (socket) => {
  console.log(`🔌 New socket connection: ${socket.id}`);

  socket.on('sendMessage', async (payload) => {
    console.log('📨 Received sendMessage:', payload);

    // ✅ Immediately emit to all clients
    io.emit('newMessage', payload);

    try {
      // 📤 Call controller logic instead of duplicating it
      await sendTextMessage(payload);
      console.log('✅ WhatsApp message sent.');
    } catch (error) {
      console.error('❌ Error sending message:', error.response?.data || error.message);

      socket.emit('messageError', {
        to: payload.to,
        error: error.response?.data || error.message
      });
    }
  });

  socket.on('disconnect', () => {
    console.log(`❌ Socket disconnected: ${socket.id}`);
  });
});


const start = async () => {
  try {
    await connect(process.env.ATLAS_URI);
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
  }
};

start();
