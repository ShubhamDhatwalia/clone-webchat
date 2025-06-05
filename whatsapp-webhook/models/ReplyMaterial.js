import mongoose from 'mongoose';

const ReplySchema = new mongoose.Schema({
    replyType: {
        type: String,
        required: true,
        enum: ['Text', 'Image', 'Document', 'Video', 'Template'], 
    },
    name: {
        type: String,
        required: true,
    },
    content: {
        type: new mongoose.Schema({
            text: { type: String },
            url: { type: String },
            materialId: { type: mongoose.Schema.Types.ObjectId },
        }, { _id: false }),
        required: true,
    },
}, { timestamps: true });


export default mongoose.model('ReplyMaterial', ReplySchema);