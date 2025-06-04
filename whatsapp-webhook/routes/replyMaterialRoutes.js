import { Router } from 'express';
const router = Router();
import { addReplyMaterial } from '../controllers/replyMaterialController.js';

// router.get('/replyMaterial/textReply')
router.post('/addReplyMaterial', addReplyMaterial)



export default router;