import { Router } from 'express';
const router = Router();
import { addKeyword, fetchKeywords } from '../controllers/keywordController.js';


router.post('/addKeyword', addKeyword);
router.get('/keywords', fetchKeywords)

export default router