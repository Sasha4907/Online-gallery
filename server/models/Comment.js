import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    painting_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Picture', required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Comment', CommentSchema)
