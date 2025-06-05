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
        console.log("text reply: " + JSON.stringify(textReplies));

    } catch (error) {
        console.error('Error fetching text replies:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export const fetchReplyMaterial = async (req, res) => {
    try {
        const replyMaterial = await ReplyMaterial.find();

        res.status(200).json(replyMaterial);
    } catch (error) {
        console.error('Error fetching reply material')
        res.status(500).json({ message: 'Server error', error });
    }
};


export const updateReplyMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const { ...updatedData } = req.body;
        const updated = await ReplyMaterial.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        console.error('Error updating reply material:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}
export const deleteReplyMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ReplyMaterial.findByIdAndDelete(id);
        res.status(200).json(deleted);
    } catch (error) {
        console.error('Error deleting reply material:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}
