const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const { Readable } = require('stream'); 
const { addMcq, getAllMcqs, deleteMcq, updateMcq, submitUserMcq } = require('../controllers/mcqController');
const { protect, isAdmin } = require('../middleware/auth');
const MCQ = require('../models/Mcq');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add', protect, isAdmin, addMcq);
router.get('/all', getAllMcqs);
router.post('/submit-user', submitUserMcq);
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
            const ans = data.correctanswer || data.correctAnswer; 
            const cat = data.category;

            if (q && ans && cat) {
                const formattedCategory = cat
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9\s]/g, '')
                    .replace(/\s+/g, '-');

                results.push({
                    question: q.trim(),
                    options: [
                        data.option1?.trim(), 
                        data.option2?.trim(), 
                        data.option3?.trim(), 
                        data.option4?.trim()
                    ].filter(Boolean), 
                    correctAnswer: ans.trim(),
                    category: formattedCategory, 
                    difficulty: data.difficulty?.trim() || 'Medium',
                    explanation: data.explanation?.trim() || '',
                    createdBy: req.user.id,
                    // FIX: Admin upload kar raha hai toh direct approve hona chahiye
                    status: 'approved' 
                });
            }
        })
        .on('end', async () => {
            try {
                if (results.length === 0) {
                    return res.status(400).json({ 
                        message: "Validation Failed: CSV columns check karein." 
                    });
                }
                
                await MCQ.insertMany(results, { ordered: false });
                res.json({ success: true, message: `${results.length} MCQs uploaded and approved successfully!` });
            } catch (err) {
                if (err.code === 11000 || (err.writeErrors && err.writeErrors.some(e => e.code === 11000))) {
                    return res.status(200).json({ 
                        success: true, 
                        message: "Upload finished. Duplicates were skipped." 
                    });
                }
                res.status(500).json({ success: false, message: "Database Error", details: err.message });
            }
        })
        .on('error', (err) => {
            res.status(500).json({ message: "Error reading CSV file." });
        });
});

module.exports = router;