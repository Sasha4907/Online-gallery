import mongoose from 'mongoose';

const PictureSchema = new mongoose.Schema({
    title: { type: String, required: true},
    tag: { type: String, required: true },
    text: { type: String, required: true},
    date: { type: Date, default: Date.now },
    picture: String,
    status: { type: String, default: 'обробляється' },
    viewsCount: { type: Number, default: 0 },
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model('Picture', PictureSchema)
