const mongoose = require('mongoose');

const McqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: {
        type: [String],
        validate: [arrayLimit, '{PATH} must have exactly 4 options']
    },
    correctAnswer: { type: String, required: true },
    category: { type: String, required: true }, // e.g., Pak Study, Islamiyat
    explanation: { type: String }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Admin ka reference
}, { timestamps: true });

function arrayLimit(val) {
    return val.length === 4;
}

module.exports = mongoose.model('Mcq', McqSchema);