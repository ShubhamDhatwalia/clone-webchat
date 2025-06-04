import keywords from "../models/keywords.js";


export const addKeyword = async (req, res) => {
    try {
        const keywordData = await keywords.create(req.body);
        res.status(201).json(keywordData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};