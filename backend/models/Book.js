const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String }, // e.g. "5MB"
  driveId: { type: String, required: true }, // Google Drive ki File ID
  color: { type: String, default: "bg-blue-500" } 
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);