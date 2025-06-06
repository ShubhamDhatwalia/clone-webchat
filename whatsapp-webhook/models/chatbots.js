import mongoose, { Schema } from 'mongoose';  

const ChatbotSchema = new Schema({
    name: { type: String, required: true, unique: true },
    triggered: { type: Number, default: 0 },
    finished: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
    flow: {
        nodes: { type: Schema.Types.Mixed, default: [] },  // Allows any type of structure
        edges: { type: Schema.Types.Mixed, default: [] },  // Allows any type of structure
    },
}, { timestamps: true });

export default mongoose.model('Chatbot', ChatbotSchema);
