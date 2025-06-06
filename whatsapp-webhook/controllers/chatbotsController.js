
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
        const chatbots = await chatbots.find();
        res.json(chatbots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const updateChatbot = async (req, res) => {
    try {
        const { id } = req.params;
        const { flow } = req.body;

        console.log('Request Body:', JSON.stringify(req.body, null, 2));

        // Check if flow is present
        if (!flow) {
            return res.status(400).json({ message: 'Flow is missing in the request body.' });
        }

        // Log flow to ensure its structure
        console.log('Flow:', flow);

        // Check if nodes and edges are valid arrays
        if (!Array.isArray(flow.nodes)) {
            console.log('Invalid nodes:', flow.nodes);  // Log invalid nodes
            return res.status(400).json({ message: 'Invalid flow data. "nodes" must be an array.' });
        }

        if (!Array.isArray(flow.edges)) {
            console.log('Invalid edges:', flow.edges);  // Log invalid edges
            return res.status(400).json({ message: 'Invalid flow data. "edges" must be an array.' });
        }


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
