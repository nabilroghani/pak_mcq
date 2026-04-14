const Quiz = require('../models/Quiz');

// 1. Create Quiz (Admin Side)
exports.createQuiz = async (req, res) => {
    try {
        const { title, mcqs, description } = req.body;

        // Validation
        if (!title || !mcqs || mcqs.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Title aur kam az kam ek MCQ zaroori hai!" 
            });
        }

        const slug = title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '') + '-' + Math.random().toString(36).substring(2, 7);
        
        const newQuiz = new Quiz({ 
            title, 
            slug, 
            mcqs, 
            description: description || "" 
        });

        await newQuiz.save();
        
        res.status(201).json({ success: true, quiz: newQuiz });
    } catch (err) {
        console.error("Quiz Create Error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getLatestQuiz = async (req, res) => {
    try {
        // .sort({ createdAt: -1 }) ka matlab hai 'Newest First'
        // .limit(1) ka matlab hai sirf ek (latest) quiz uthao
        const quiz = await Quiz.findOne()
                               .sort({ createdAt: -1 }) 
                               .populate('mcqs');

        if (!quiz) {
            return res.status(404).json({ 
                success: false, 
                message: "Filhal koi quiz database mein nahi mili." 
            });
        }

        res.status(200).json({ success: true, quiz });
    } catch (err) {
        console.error("Fetch Latest Quiz Error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getQuizBySlug = async (req, res) => {
    try {
        const quiz = await Quiz.findOne({ slug: req.params.slug }).populate('mcqs');
        if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });
        res.status(200).json({ success: true, quiz });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteLatestQuiz = async (req, res) => {
    try {
        const latest = await Quiz.findOne().sort({ createdAt: -1 });

        if (!latest) {
            return res.status(404).json({ success: false, message: "Koi quiz nahi mili." });
        }

        await Quiz.findByIdAndDelete(latest._id);

        res.status(200).json({ success: true, message: "Quiz deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};