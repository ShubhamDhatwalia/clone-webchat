import { Router } from 'express';
const router = Router();

import { createContact } from '../controllers/contactController';


router.get('/contacts')
router.post('/addContact', createContact);
router.put('/updateContact')
router.delete('/deleteContact')
router.patch('/contacts/${id}/tags')
router.patch('/contacts/${id}/tags/remove')
router.patch('/contacts/${id}/notes')
router.patch('/contacts/${id}/notes/remove')
router.patch('/contacts/${id}/notes/update')



export default router;
