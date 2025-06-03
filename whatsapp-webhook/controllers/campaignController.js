import Campaign from "../models/campaign.js";

// Get all campaigns
export const fetchCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.json(campaigns);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new campaign
export const createCampaign = async (req, res) => {
    try {
        const campaign = new Campaign(req.body);
        await campaign.save();
        res.status(201).json(campaign);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a campaign (assume id is in req.body._id or you can change to req.params.id)
export const updateCampaign = async (req, res) => {
    try {
        const { _id, ...updateData } = req.body;
        if (!_id) {
            return res.status(400).json({ error: "Campaign id is required" });
        }
        const updatedCampaign = await Campaign.findByIdAndUpdate(_id, updateData, { new: true });
        if (!updatedCampaign) {
            return res.status(404).json({ error: "Campaign not found" });
        }
        res.json(updatedCampaign);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a campaign (assume campaignId is sent in req.body.campaignId or use req.params.id)
export const deleteCampaign = async (req, res) => {
    try {
        const { campaignId } = req.body;
        if (!campaignId) {
            return res.status(400).json({ error: "Campaign id is required" });
        }
        const deleted = await Campaign.findByIdAndDelete(campaignId);
        if (!deleted) {
            return res.status(404).json({ error: "Campaign not found" });
        }
        res.json({ message: "Campaign deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
