import { Router } from 'express';
const router = Router();
import { fetchTemplates, createTemplate, editTemplate, deleteTemplate  } from '../controllers/templateController.js';



router.get('/templates', fetchTemplates);
router.post('/createTemplate', createTemplate);
router.post('/editTemplate', editTemplate);
router.delete('/deleteTemplate', deleteTemplate);

export default router;

