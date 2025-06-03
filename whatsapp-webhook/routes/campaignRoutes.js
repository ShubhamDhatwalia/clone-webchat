import { Router } from 'express';
const router = Router();
import { fetchCampaigns, createCampaign, updateCampaign, deleteCampaign } from '../controllers/campaignController.js';


router.get('/campaign', fetchCampaigns)
router.post('/campaign', createCampaign)
router.put('/campaign', updateCampaign)
router.delete('/campaign', deleteCampaign)



