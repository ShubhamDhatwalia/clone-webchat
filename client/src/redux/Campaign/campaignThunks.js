// campaignThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all campaigns
export const fetchCampaigns = createAsyncThunk(
    'campaign/fetchCampaigns',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/campaign');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Create new campaign
export const createCampaign = createAsyncThunk(
    'campaign/createCampaign',
    async (campaignData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/campaign', campaignData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Update existing campaign
export const updateCampaign = createAsyncThunk(
    'campaign/updateCampaign',
    async ({ id, updatedCampaign }, { rejectWithValue }) => {
        console.log("Updated Campaign:", updatedCampaign);
        console.log("Campaign ID:", id);

        try {
            console.log("Start API call...");
            const response = await axios.put(`/editCampaign/${id}`, updatedCampaign);
            console.log("API Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Update Campaign Error:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


// Delete campaign
export const deleteCampaign = createAsyncThunk(
    'campaign/deleteCampaign',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`/campaign/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
