import { Router } from 'express';
const router = Router();

import { createContact, fetchContacts, updateContact, deleteContact, addTags } from '../controllers/contactController';


router.get('/contacts', fetchContacts)
router.post('/addContacts', createContact);
router.put('/updateContact', updateContact)
router.delete('/deleteContact', deleteContact)
router.patch('/contacts/${id}/tags', addTags)
router.patch('/contacts/${id}/tags/remove')
router.patch('/contacts/${id}/notes')
router.patch('/contacts/${id}/notes/remove')
router.patch('/contacts/${id}/notes/update')



export default router;
