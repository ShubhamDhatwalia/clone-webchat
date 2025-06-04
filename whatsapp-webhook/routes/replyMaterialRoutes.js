import { Router } from 'express';
const router = Router();
import { addReplyMaterial, fetchTextReply, updateReplyMaterial, deleteReplyMaterial } from '../controllers/replyMaterialController.js';

// router.get('/replyMaterial/textReply')
router.post('/addReplyMaterial', addReplyMaterial)
router.get('/replyMaterial/textReply', fetchTextReply)
router.put('updateReplyMaterial/:id', updateReplyMaterial)
router.delete('/deleteReplyMaterial/:id', deleteReplyMaterial)


export default router;