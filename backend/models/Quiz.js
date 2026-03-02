const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // link for sharing
    mcqs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mcq' }], // Selected MCQs ki IDs
    description: { type: String },
    views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);