import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    painting_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Picture', required: true },
    added_at: { type: Date, default: Date.now }
});

FavoriteSchema.index({ user_id: 1, painting_id: 1 }, { unique: true });

export default mongoose.model('Favorite', FavoriteSchema)
