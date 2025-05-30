import express from 'express';
import dotenv from 'dotenv';
import webhookRoutes from './routes/webhookRoutes.js';
import cors from 'cors';
import connect from './database/connection.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());





app.use(express.json());


app.use('/', webhookRoutes);



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


// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
