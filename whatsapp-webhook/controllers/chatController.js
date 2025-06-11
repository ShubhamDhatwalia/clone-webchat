import chat from "../models/chat.js";


export const fetchChat = async (req, res) => {
    try {
        const phone = req.params.phone;
        const chat = await chat.find({ phone: phone });
        res.json(chat);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });

    }
}