import chat from "../models/chat.js";


export const fetchChat = async (req, res) => {
    try {
        const rawPhone = req.params.phone;
        const phone = rawPhone.replace(/^\+/, '');

        console.log('Sanitized phone:', phone);

        const chats = await chat.find({ phone: phone });
        res.json(chats);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });

    }
}