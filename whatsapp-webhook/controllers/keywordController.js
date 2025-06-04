import keywords from "../models/keywords.js";


export const addKeyword = async (req, res) => {
    try {
        const { keyword } = req.body;
        const keywordData = await keywords.create({ keyword });
        res.status(201).json(keywordData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};