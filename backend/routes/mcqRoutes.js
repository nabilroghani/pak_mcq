const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinaryConfig');
const csv = require('csv-parser');
const fs = require('fs');
const { addMcq, getAllMcqs, deleteMcq, updateMcq } = require('../controllers/mcqController');
const { protect, isAdmin } = require('../middleware/auth');
const MCQ = require('../models/Mcq'); 

const upload = multer({ dest: 'uploads/' });

router.post('/add', protect, isAdmin, addMcq);
router.get('/all', getAllMcqs);
router.delete('/delete/:id', protect, isAdmin, deleteMcq);
router.put('/update/:id', protect, isAdmin, updateMcq);

router.post('/upload-csv', protect, isAdmin, upload.single('file'), async (req, res) => {
    const results = [];
    if (!req.file) return res.status(400).json({ message: "Please upload a file" });

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => {
            // Check if essential fields exist in the row
            if (data.question && data.correctAnswer && data.category) {
                
                // Data Cleaning Logic
                const cleanCategory = data.category
                    .replace(/-/g, ' ')     // Hyphens ko spaces mein badlo
                    .replace(/\s+/g, ' ')  // Extra spaces ko single space banao
                    .trim();               // Shuru aur aakhir ki spaces khatam karo

                results.push({
                    question: data.question.trim(),
                    options: [
                        data.option1?.trim(), 
                        data.option2?.trim(), 
                        data.option3?.trim(), 
                        data.option4?.trim()
                    ].filter(Boolean), 
                    correctAnswer: data.correctAnswer.trim(),
                    category: cleanCategory,
                    difficulty: data.difficulty?.trim() || 'Medium',
                    explanation: data.explanation?.trim() || '',
                    createdBy: req.user.id 
                });
            }
        })
        .on('end', async () => {
            try {
                if (results.length === 0) {
                    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
                    return res.status(400).json({ 
                        message: "CSV file is empty or formatted incorrectly. Ensure columns are: question, option1, option2, option3, option4, correctAnswer, category" 
                    });
                }
                
                // Bulk Insert
                await MCQ.insertMany(results);
                
                // File delete after success
                fs.unlinkSync(req.file.path); 
                res.json({ success: true, message: `${results.length} MCQs uploaded and cleaned successfully!` });
            } catch (err) {
                console.error("Upload Error:", err);
                if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
                res.status(500).json({ success: false, message: "Database Error. Check if question is unique or fields are correct." });
            }
        });
});

module.exports = router;