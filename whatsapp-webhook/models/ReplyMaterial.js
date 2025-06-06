import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
    text: { type: String },
    url: { type: String },
    materialModel: {
        type: String,
        enum: ['Text', 'Image', 'Document', 'Video', 'Template', 'Chatbot'],
    },
    materialId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'content.materialModel',
    },
}, { _id: false });

const ReplySchema = new mongoose.Schema({
    replyType: {
        type: String,
        required: true,
        enum: ['Text', 'Image', 'Document', 'Video', 'Template', 'Chatbot'],
    },
    name: {
        type: String,
        required: true,
    },
    content: {
        type: ContentSchema,
    },
}, { timestamps: true });

// Pre-save hook
ReplySchema.pre('save', function (next) {
    if (this.replyType && this.content) {
        this.content.materialModel = this.replyType;
    }
    next();
});

// Add a unique index on nested field
ReplySchema.index({ 'content.materialId': 1 }, { unique: true, sparse: true });

export default mongoose.model('ReplyMaterial', ReplySchema);
