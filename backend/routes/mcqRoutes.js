const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const { Readable } = require('stream'); 
const { addMcq, getAllMcqs, deleteMcq, updateMcq } = require('../controllers/mcqController');
const { protect, isAdmin } = require('../middleware/auth');
const MCQ = require('../models/Mcq');

// ✅ Vercel Fix: Memory storage use karein taake folder na banana paray
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add', protect, isAdmin, addMcq);
router.get('/all', getAllMcqs);
router.delete('/delete/:id', protect, isAdmin, deleteMcq);
router.put('/update/:id', protect, isAdmin, updateMcq);

// ✅ CSV Upload Route
router.post('/upload-csv', protect, isAdmin, upload.single('file'), async (req, res) => {
    const results = [];
    
    if (!req.file) {
        return res.status(400).json({ message: "Please upload a file" });
    }

    // ✅ File buffer ko stream mein convert karein
    const stream = Readable.from(req.file.buffer.toString());

    stream
        .pipe(csv())
        .on('data', (data) => {
            if (data.question && data.correctAnswer && data.category) {
                const cleanCategory = data.category
                    .replace(/-/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();

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
                    return res.status(400).json({ 
                        message: "CSV is empty or columns are wrong (Required: question, correctAnswer, category)" 
                    });
                }
                
                await MCQ.insertMany(results);
                res.json({ success: true, message: `${results.length} MCQs uploaded successfully!` });
            } catch (err) {
                console.error("Upload Error:", err);
                res.status(500).json({ success: false, message: "Database Error. Check for duplicate questions." });
            }
        })
        .on('error', (err) => {
            res.status(500).json({ message: "CSV Parsing Error" });
        });
});

module.exports = router;