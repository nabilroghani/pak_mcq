const mongoose = require('mongoose');
const SubCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    parentSubject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    icon: { type: String, default: "BookOpen" }
}, { timestamps: true });

module.exports = mongoose.model('SubCategory', SubCategorySchema);