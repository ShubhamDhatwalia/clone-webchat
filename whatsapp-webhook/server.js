import express from 'express';
import dotenv from 'dotenv';
import webhookRoutes from './routes/webhookRoutes.js';
import cors from 'cors';
import connect from './database/connection.js';
import templateRoutes from './routes/templateRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import contactRoutes from './routes/contactRoutes.js'
import replyMaterialRoutes from './routes/replyMaterialRoutes.js'
import keywordRoutes from './routes/keywordRoutes.js'
import chatbotsRoutes from './routes/chatbotsRoutes.js'




dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


const allowedOrigins = ['http://localhost:5173', 'https://clone-webchat.onrender.com'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
}));





app.use(express.json());


app.use('/', webhookRoutes);
app.use('/', templateRoutes);
app.use('/', campaignRoutes);
app.use('/', contactRoutes);
app.use('/', replyMaterialRoutes);
app.use('/', keywordRoutes)
app.use('/', chatbotsRoutes)


const start = async () => {
  try {
    await connect(process.env.ATLAS_URI);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(' Failed to start server:', err.message);
  }
};

start();


