import chatbots from "../models/chatbots";



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
        const chatbots = await chatbots.find();
        res.json(chatbots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export const updateChatbot = async (req, res) => {
    try {
        const { id } = req.params;
        const chatbot = await chatbots.findByIdAndUpdate(id, req.body);
        if (!chatbot) return res.status(404).json({ message: 'Chatbot not found' });
        const updatedChatbot = await chatbots.findById(id);
        res.json(updatedChatbot);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteChatbot = async (req, res) => {
    try {
        const { id } = req.params;
        const chatbot = await chatbots.findByIdAndDelete(id);
        res.json(chatbot);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
