
import chatbots from "../models/chatbots.js";



export const addChatbot = async (req, res) => {
    try {
        const chatbot = new chatbots(req.body);
        await chatbot.save();
        res.status(200).json(chatbot);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const getChatbots = async (req, res) => {
    try {
        const chatbot = await chatbots.find();
        res.json(chatbot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const updateChatbot = async (req, res) => {
    try {
        const { id } = req.params;
        const flow  = req.body;

        const updatedChatbot = await chatbots.findByIdAndUpdate(
            id,
            { $set: { "flow.nodes": flow.nodes, "flow.edges": flow.edges } },
            { new: true }
        );

        if (!updatedChatbot) {
            return res.status(404).json({ message: 'Chatbot not found' });
        }

        res.json(updatedChatbot);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};




export const deleteChatbot = async (req, res) => {
    try {
        const { id } = req.params;
        const chatbot = await chatbots.findByIdAndDelete(id);
        res.json(chatbot);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
