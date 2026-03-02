const Quiz = require('../models/Quiz');

exports.createQuiz = async (req, res) => {
    try {
        const { title, mcqs, description } = req.body;

        // Validation: Check karein data aa raha hai ya nahi
        if (!title || !mcqs || mcqs.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Title and at least one MCQ are required!" 
            });
        }

        // Safe Slug Generation
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
        console.error("Quiz Create Error:", err); // Yeh line terminal mein error dikhayegi
        res.status(500).json({ success: false, message: err.message });
    }
};

// Public Quiz Fetching
exports.getQuizBySlug = async (req, res) => {
    try {
        const quiz = await Quiz.findOne({ slug: req.params.slug }).populate('mcqs');
        if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });
        res.status(200).json({ success: true, quiz });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};