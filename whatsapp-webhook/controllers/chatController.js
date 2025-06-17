import chat from "../models/chat.js";
export const fetchChat = async (req, res) => {
    try {
        const rawPhone = req.params.phone;
        const phone = rawPhone.replace(/^\+/, '');

        const limit = parseInt(req.query.limit) || 15;
        const skip = parseInt(req.query.skip) || 0;

        const chats = await chat
            .find({
                $or: [
                    { "message.from": phone },
                    { "message.to": rawPhone }
                ]
            })
            .sort({ "message.timestamp": -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        res.json(chats.reverse());
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};


export const fetchAllChats = async (req, res) => {
    try {
        const chats = await chat.aggregate([
            {
                $addFields: {
                    fromNormalized: {
                        $cond: [
                            { $eq: [{ $substrBytes: ["$message.from", 0, 1] }, "+"] },
                            { $substrBytes: ["$message.from", 1, { $strLenBytes: "$message.from" }] },
                            "$message.from"
                        ]
                    },
                    toNormalized: {
                        $cond: [
                            { $eq: [{ $substrBytes: ["$message.to", 0, 1] }, "+"] },
                            { $substrBytes: ["$message.to", 1, { $strLenBytes: "$message.to" }] },
                            "$message.to"
                        ]
                    }
                }
            },
            {
                $addFields: {
                    chatKey: {
                        $cond: {
                            if: { $gt: ["$fromNormalized", "$toNormalized"] },
                            then: { $concat: ["$toNormalized", "_", "$fromNormalized"] },
                            else: { $concat: ["$fromNormalized", "_", "$toNormalized"] }
                        }
                    }
                }
            },
            { $sort: { "message.timestamp": -1 } },
            {
                $group: {
                    _id: "$chatKey",
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

