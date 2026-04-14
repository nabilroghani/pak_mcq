const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    mcqs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mcq' }],
    description: { type: String },
    views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);