import { Router } from 'express';
const router = Router();
import { addChatbot, getChatbots, updateChatbot, deleteChatbot } from '../controllers/chatbotsController.js';


router.post('/addChatbot', addChatbot);
router.get('/getChatbots', getChatbots);
router.put('/updateChatbot/:id', updateChatbot);
router.delete('/deleteChatbot/:id', deleteChatbot);




export default router;
