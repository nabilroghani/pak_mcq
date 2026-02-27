const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const { Readable } = require('stream'); 
const { addMcq, getAllMcqs, deleteMcq, updateMcq } = require('../controllers/mcqController');
const { protect, isAdmin } = require('../middleware/auth');
const MCQ = require('../models/Mcq');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add', protect, isAdmin, addMcq);
router.get('/all', getAllMcqs);
router.delete('/delete/:id', protect, isAdmin, deleteMcq);
router.put('/update/:id', protect, isAdmin, updateMcq);

router.post('/upload-csv', protect, isAdmin, upload.single('file'), async (req, res) => {
    const results = [];
    
    if (!req.file) {
        return res.status(400).json({ message: "Please upload a file" });
    }

    const stream = Readable.from(req.file.buffer.toString());

    stream
        .pipe(csv({
            mapHeaders: ({ header }) => header.trim().toLowerCase() 
        }))
        .on('data', (data) => {
            const q = data.question;
            const ans = data.correctanswer; 
            const cat = data.category;

            if (q && ans && cat) {
                results.push({
                    question: q.trim(),
                    options: [
                        data.option1?.trim(), 
                        data.option2?.trim(), 
                        data.option3?.trim(), 
                        data.option4?.trim()
                    ].filter(Boolean), 
                    correctAnswer: ans.trim(),
                    category: cat.trim().replace(/-/g, ' ').replace(/\s+/g, ' '),
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
                        message: "Validation Failed: Check if your CSV headers are: question, option1, option2, option3, option4, correctAnswer, category" 
                    });
                }
                
                await MCQ.insertMany(results, { ordered: false });
                res.json({ success: true, message: `${results.length} MCQs uploaded successfully!` });
            } catch (err) {
                if (err.code === 11000) {
                    return res.status(200).json({ success: true, message: "Upload finished (Some duplicates were skipped)." });
                }
                console.log("Detailed DB Error:", JSON.stringify(err, null, 2));
                res.status(500).json({ success: false, message: "Database Error. Ensure all required fields are present.",details: err.message });
            }
        })
        .on('error', (err) => {
            res.status(500).json({ message: "Error reading CSV file." });
        });
});

module.exports = router;