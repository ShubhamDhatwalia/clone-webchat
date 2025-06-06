import { Router } from 'express';
const router = Router();
import { addChatbot, getChatbots, updateChatbot, deleteChatbot } from '../controllers/chatbotsController.js';


router.post('/addChatbot', addChatbot);


export default router;
