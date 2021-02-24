const mongoose = require('mongoose');
const Users = mongoose.model('User', new mongoose.Schema({
    nickName: { type: String, tirm: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, required: true, minlength: 6, maxlength: 15 },
    role: { type: String, required: true },
    avatar: String,
    status: { type: Boolean, required: true }
}));
module.exports = Users;