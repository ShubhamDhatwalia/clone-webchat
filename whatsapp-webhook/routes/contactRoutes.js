import { Router } from 'express';
const router = Router();

import { createContact, fetchContacts, updateContact, deleteContact, addTags, removeTags } from '../controllers/contactController.js';


router.get('/contacts', fetchContacts)
router.post('/addContacts', createContact);
router.put('/updateContact/:id', updateContact)
router.delete('/deleteContact/:id', deleteContact)
router.patch('/contacts/:id/addTags', addTags)
router.patch('/contacts/:id/tags/remove', removeTags)
router.patch('/contacts/:id/addNotes')
router.patch('/contacts/:id/notes/remove')
router.patch('/contacts/:id/notes/update')



export default router;
