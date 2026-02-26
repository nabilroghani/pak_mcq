const Job = require('../models/job');

// 1. Post New Job
exports.postJob = async (req, res) => {
    try {
        const { jobTitle, organization, department, location, deadline, description } = req.body;
        
        const jobImage = req.file ? req.file.path : ""; 

        const newJob = new Job({
            jobTitle, organization, department, location, deadline, description,
            jobImage, 
            createdBy: req.user.id
        });
        
        await newJob.save();
        res.status(201).json({ success: true, message: "Job posted with Cloudinary!" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Cloudinary Upload Error" });
    }
};

// 2. Get All Jobs 
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: jobs });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching jobs" });
    }
};

// 3. Update Job 
exports.updateJob = async (req, res) => {
    try {
        let updateData = { ...req.body };
        
        if (req.file) {
            updateData.jobImage = req.file.path.replace(/\\/g, '/');
        }

        const updatedJob = await Job.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json({ success: true, data: updatedJob });
    } catch (err) {
        res.status(500).json({ success: false, message: "Update failed" });
    }
};

// 4. Delete Job 
exports.deleteJob = async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Job deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Delete failed" });
    }
};