import { Router } from 'express';
const router = Router();
import { addReplyMaterial, fetchTextReply } from '../controllers/replyMaterialController.js';

// router.get('/replyMaterial/textReply')
router.post('/addReplyMaterial', addReplyMaterial)
router.get('/replyMaterial/textReply', fetchTextReply)


export default router;