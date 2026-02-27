const mongoose = require('mongoose');
const SubjectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true }, // e.g. "engineering-mcqs"
    color: { type: String, default: "from-blue-600 to-indigo-800" }
}, { timestamps: true });

module.exports = mongoose.model('Subject', SubjectSchema);