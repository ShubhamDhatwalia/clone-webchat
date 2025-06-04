import { Router } from 'express';
const router = Router();
import { addKeyword } from '../controllers/keywordController.js';


router.post('/addKeyword', addKeyword);

export default router