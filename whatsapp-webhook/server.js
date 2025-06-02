import express from 'express';
import dotenv from 'dotenv';
import webhookRoutes from './routes/webhookRoutes.js';
import cors from 'cors';
import connect from './database/connection.js';
import templateRoutes from './routes/templateRoutes.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());



mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



app.use(express.json());


app.use('/', webhookRoutes);
app.use('/', templateRoutes);

console.log(process.env.ATLAS_URI);


const start = async () => {
  try {
    await connect(process.env.ATLAS_URI);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
  }
};

start();


