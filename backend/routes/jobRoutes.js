const express = require('express');
const router = express.Router();
const multer = require('multer'); // 👈 Yeh line lazmi chahiye
const { storage } = require('../config/cloudinaryConfig');
const { protect, isAdmin } = require('../middleware/auth');
const { 
    postJob, 
    getAllJobs, 
    deleteJob, 
    updateJob 
} = require('../controllers/jobController');

// Multer setup with Cloudinary storage
const upload = multer({ storage: storage });

// --- Jobs Routes ---

// 1. Post New Job (With Image Upload)
router.post('/post', protect, isAdmin, upload.single('jobImage'), postJob);

// 2. Fetch All Jobs (Public access for JobUpdates.jsx)
router.get('/all', getAllJobs);

// 3. Update Job (Supports optional image update)
router.put('/update/:id', protect, isAdmin, upload.single('jobImage'), updateJob);

// 4. Delete Job
router.delete('/delete/:id', protect, isAdmin, deleteJob);

module.exports = router;