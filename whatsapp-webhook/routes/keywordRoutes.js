import { Router } from 'express';
const router = Router();
import { addKeyword, fetchKeywords, deleteKeywords } from '../controllers/keywordController.js';


router.post('/addKeyword', addKeyword);
router.get('/keywords', fetchKeywords)
router.delete('/deleteKeyword', deleteKeywords)

export default router