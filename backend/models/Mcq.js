const mongoose = require('mongoose');

const McqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: {
        type: [String],
        validate: [arrayLimit, '{PATH} must have exactly 4 options']
    },
    correctAnswer: { type: String, required: true },
    category: { type: String, required: true },
    explanation: { type: String }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // User submission ke liye (Agar login nahi hai toh String save hogi)
    submittedBy: { type: String, default: 'Guest' },

    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: 'pending' 
    }
}, { timestamps: true });

function arrayLimit(val) {
    return val.length === 4;
}

module.exports = mongoose.model('Mcq', McqSchema);