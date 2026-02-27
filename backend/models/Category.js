const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    color: { type: String, default: "from-blue-600 to-blue-800" },
    icon: { type: String, default: "BookOpen" }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);