const mongoose = require('../db');
const bcrypt = require('bcryptjs');
const { ADMIN, USER, GUEST } = require('../utils/roles');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true },
    password: { 
        type: String, 
        required: true },
    role: { 
        type: String, 
        enum: [ADMIN, USER, GUEST], 
        default: GUEST, 
        required: true
    }
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
