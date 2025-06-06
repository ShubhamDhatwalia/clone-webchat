import mongoose from 'mongoose';

const ChatbotSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    triggered: { type: Number, default: 0 },
    finished: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
    flow: {
        nodes: { type: Schema.Types.Mixed, default: [] },
        edges: { type: Schema.Types.Mixed, default: [] }
    }
}, { timestamps: true });

export default mongoose.model('Chatbot', ChatbotSchema);
