import { Router } from 'express';
const router = Router();
import { addReplyMaterial, fetchTextReply, updateReplyMaterial, deleteReplyMaterial, fetchReplyMaterial, fetchTemplateReply } from '../controllers/replyMaterialController.js';

// router.get('/replyMaterial/textReply')
router.post('/addReplyMaterial', addReplyMaterial)
router.get('/replyMaterial/textReply', fetchTextReply)
router.put('/updateReplyMaterial/:id', updateReplyMaterial)
router.delete('/deleteReplyMaterial/:id', deleteReplyMaterial)
router.get('/replyMaterial', fetchReplyMaterial)
router.get('/replyMaterial/templateReply', fetchTemplateReply)

export default router;