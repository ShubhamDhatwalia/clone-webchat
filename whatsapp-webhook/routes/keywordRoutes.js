import { Router } from 'express';
const router = Router();
import { addKeyword, fetchKeywords, deleteKeywords } from '../controllers/keywordController.js';


router.post('/addKeyword', addKeyword);
router.get('/keywords', fetchKeywords)
router.delete('/deleteKeyword/:id', deleteKeywords)

export default router