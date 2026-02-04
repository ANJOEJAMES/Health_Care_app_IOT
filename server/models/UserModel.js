const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: 'user' }
});

const UserModel = mongoose.model('User', UserSchema, 'users');
module.exports = UserModel;
