const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    company: { type: String, required: true },
    phone: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
