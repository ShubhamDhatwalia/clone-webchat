import chat from "../models/chat.js";

export const fetchChat = async (req, res) => {
    try {
        const rawPhone = req.params.phone;
        const phone = rawPhone.replace(/^\+/, '');

        console.log('Sanitized phone:', phone);

        const chats = await chat
            .find({ "message.from": phone })
            .sort({ "message.timestamp": 1 })
            .lean(); // boost performance

        res.json(chats);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};


export const fetchAllChats = async (req, res) => {
    try {
        const chats = await chat.aggregate([
            { $sort: { "message.timestamp": -1 } },
            {
                $group: {
                    _id: "$message.from",
                    latestChat: { $first: "$$ROOT" }
                }
            },
            {
                $replaceRoot: { newRoot: "$latestChat" }
            },
            {
                $sort: { "message.timestamp": -1 }
            }
        ]);

        res.json(chats);
    } catch (err) {
        console.error("Error in fetchAllChats:", err);
        res.status(500).json({ message: err.message });
    }
};
