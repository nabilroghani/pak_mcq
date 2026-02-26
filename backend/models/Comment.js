const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    mcqId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mcq', required: true },
    userName: { type: String, required: true },
    commentText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);