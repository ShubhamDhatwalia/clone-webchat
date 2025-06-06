import { Router } from 'express';
const router = Router();
import { addChatbot, getChatbots, updateChatbot, deleteChatbot } from '../controllers/chatbotsController';


router.post('/addChatbot', addChatbot);