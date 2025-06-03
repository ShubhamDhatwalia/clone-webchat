import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
    campaignName: { type: String, required: true, unique: true },
    whatsappNumber: { type: String, required: true },
    templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template' },
    contactList: [{ type: String }], 
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
});

export default mongoose.model('Campaign', campaignSchema);
