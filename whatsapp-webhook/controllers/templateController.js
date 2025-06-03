import axios from 'axios';
import Template from '../models/templates.js'

import dotenv from 'dotenv';
dotenv.config();


const accessToken = process.env.WHATSAPP_API_TOKEN;
const businessId = process.env.WHATSAPP_BUSINESS_ID;
const baseURL = `https://graph.facebook.com/v22.0/${businessId}/message_templates`;

console.log(baseURL);
console.log(accessToken);
console.log(businessId);







// ------------------------- Fetch Templates -------------------------
export const fetchTemplates = async (req, res) => {
    try {
        const response = await axios.get(`${baseURL}?access_token=${accessToken}&limit=1000`);
        const templates = response.data.data;
        console.log(JSON.stringify(templates));

        const operations = templates.map(t => ({
            updateOne: {
                filter: { id: t.id },
                update: {
                    $set: { ...t, updatedAt: new Date() }
                },
                upsert: true
            }
        }));

        await Template.bulkWrite(operations);

        const visibleTemplates = await Template.find({ deleted: { $ne: true } });

        res.status(200).json({ templates: visibleTemplates });
    } catch (error) {
        console.error('Fetch Error:', error.message);
        res.status(500).json({
            message: 'Failed to fetch templates',
            error: error.response?.data || error.message,
        });
    }
};




// ------------------------- Create Template -------------------------
export const createTemplate = async (req, res) => {
    try {
        const payload = req.body;
        console.log("Creating template:", payload.name);

        await axios.post(baseURL, payload, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const fetchResponse = await axios.get(`${baseURL}?access_token=${accessToken}&limit=1000`);
        const templates = fetchResponse.data.data;

        const created = templates.find(t => t.name === payload.name);

        if (!created) {
            return res.status(404).json({ message: 'Template created but not found in fetch.' });
        }

        const newTemplateData = {
            ...created,
            createdAt: new Date(),
        };

        const saved = await Template.create(newTemplateData);

        res.status(201).json({ template: saved });
    } catch (error) {
        console.error('Create Error:', error.message);
        res.status(500).json({
            message: 'Failed to create template',
            error: error.response?.data || error.message,
        });
    }
};


// ------------------------- Edit Template -------------------------
export const editTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const payload = req.body;

        console.log("id: " + id)
        console.log("payload: " + JSON.stringify(payload));


        console.log("backend editing template: " + JSON.stringify(payload))
        console.log("id: " + id);

        const response = await axios.post(`https://graph.facebook.com/v22.0/${id}`, payload, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const updatedData = {
            ...response.data,
            payload,
            updatedAt: new Date(),
        };

        const updated = await Template.findOneAndUpdate({ id }, updatedData, { new: true });

        res.status(200).json({ template: updated });
    } catch (error) {
        console.error('Edit Error:', error.message);
        res.status(500).json({
            message: 'Failed to update template',
            error: error.response?.data || error.message,
        });
    }
};

// ------------------------- Delete Template -------------------------
export const deleteTemplate = async (req, res) => {
    try {
        const { id, name } = req.query;
        console.log(id, name);

        if (!id || !name) {
            return res.status(400).json({ message: 'Missing template id or name' });
        }

        const deleteUrl = `${baseURL}?hsm_id=${id}&name=${name}&access_token=${accessToken}`;

        const response = await axios.delete(deleteUrl);

        if (response.data.success) {
            await Template.deleteOne({ id });

            res.status(200).json({ success: true, id });
        } else {
            throw new Error('Delete failed on WhatsApp');
        }
    } catch (error) {
        console.error('Delete Error:', error.message);
        res.status(500).json({
            message: 'Failed to delete template',
            error: error.response?.data || error.message,
        });
    }
};

