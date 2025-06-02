import { Router } from 'express';
const router = Router();
import { fetchTemplates, createTemplate, editTemplate, deleteTemplate } from '../controllers/templateController.js';



router.get('/', fetchTemplates);
router.post('/', createTemplate);
router.put('/:id', editTemplate);
router.delete('/', deleteTemplate);

export default router;

