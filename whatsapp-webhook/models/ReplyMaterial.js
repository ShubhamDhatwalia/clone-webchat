import mongoose from 'mongoose';


const ReplySchema = new mongoose.Schema({
    replyType: {
        type: String,
        required: true,
        enum: ['Text', 'Image', 'Document', 'Video'], // Extend as needed
    },
    name: {
        type: String,
        required: true,
    },
    content: {
        type: mongoose.Schema.Types.Mixed, // Flexible field
        required: true,
    },
}, { timestamps: true });


export default mongoose.model('ReplyMaterial', ReplySchema);