import chat from "../models/chat.js";


export const fetchChat = async (req, res) => {
    try {
        const rawPhone = req.params.phone;
        const phone = rawPhone.replace(/^\+/, '');

        console.log('Sanitized phone:', phone);

        const chats = await chat.find({ "message.from": phone });
        res.json(chats);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });

    }
}

export const fetchAllChats = async (req, res) => {
    try {
        const chats = await chat.find();
        res.json(chats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}