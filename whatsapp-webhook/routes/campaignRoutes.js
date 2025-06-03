import { Router } from 'express';
const router = Router();
import { fetchCampaigns, createCampaign, updateCampaign, deleteCampaign } from '../controllers/campaignController.js';
import campaign from '../models/campaign.js';


router.get('/campaign', fetchCampaigns)
router.post('/campaign', createCampaign)
router.put('/campaign', updateCampaign)
router.delete('/campaign', deleteCampaign)


export default campaignRoutes;
