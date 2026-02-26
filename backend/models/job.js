const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    organization: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    deadline: { type: Date, required: true },
    description: { type: String, required: true },
    jobImage: {
        type: String,
        default: ""
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);