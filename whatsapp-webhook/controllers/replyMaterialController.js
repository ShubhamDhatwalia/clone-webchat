import ReplyMaterial from "../models/ReplyMaterial.js";



export const addReplyMaterial = async (req, res) => {
    try {
        const replyMaterial = await ReplyMaterial.create(req.body);
        res.status(200).json(replyMaterial)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}
export const fetchTextReply = async (req, res) => {
    try {
        const textReplies = await ReplyMaterial.find({ replyType: 'Text' });
        res.status(200).json(textReplies);
    } catch (error) {
        console.error('Error fetching text replies:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
