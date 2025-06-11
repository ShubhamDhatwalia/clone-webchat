import { Router } from 'express';
const router = Router();
import { fetchChat } from '../controllers/chatController.js';




router.get('/chat:phone', fetchChat);

export default router