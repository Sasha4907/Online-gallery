import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    nikname: { type: String, unique: true },
    name: { type: String, default: 'User' },
    email: { type: String, required: true, unique: true },
    registrationDate: { type: Date, default: Date.now },
    avatar: { type: String, default: '/uploads/defaultAvatar.png' },
    passwordHash: { type: String, required: true },
    status: { type: String, required: true }
});

export default mongoose.model('User', UserSchema);