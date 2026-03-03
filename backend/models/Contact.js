const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    subject: String,
    message: { type: String, required: true },
    status: { type: String, default: 'pending' }, // pending, replied
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);