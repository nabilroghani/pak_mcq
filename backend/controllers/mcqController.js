const Mcq = require('../models/Mcq');

// Add New MCQ
exports.addMcq = async (req, res) => {
    try {
        const { question, options, correctAnswer, category, explanation } = req.body;
        
        const newMcq = new Mcq({
            question,
            options,
            correctAnswer,
            category,
            explanation,
            createdBy: req.user.id 
        });

        await newMcq.save();
        res.status(201).json({ success: true, message: "MCQ added successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error adding MCQ" });
    }
};

// Get All MCQs 
exports.getAllMcqs = async (req, res) => {
    try {
        const { category, search } = req.query;
        let filter = {};

        // 1. Agar user ne Search bar mein kuch likha hai (Priority Search)
        if (search && search.trim() !== "") {
            filter.question = { $regex: search, $options: 'i' };
        } 
        // 2. Agar Search nahi hai, tab Category filter check karein
        else if (category && category !== "undefined" && category !== "") {
            // Hyphens ko spaces mein badlein (e.g. computer-science -> computer science)
            const formattedCategory = category.replace(/-/g, ' ');
            filter.category = { $regex: new RegExp(`^${formattedCategory}$`, 'i') };
        }

        // Agar dono nahi hain, toh saaray MCQs mil jayenge
        const mcqs = await Mcq.find(filter).sort({ createdAt: -1 });
        
        console.log("Applied Filter:", filter); // Debugging ke liye terminal mein dekhein

        res.status(200).json({
            success: true,
            count: mcqs.length,
            data: mcqs
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Delete MCQ
exports.deleteMcq = async (req, res) => {
    try {
        const mcq = await Mcq.findById(req.params.id);

        if (!mcq) {
            return res.status(404).json({ success: false, message: "MCQ not found" });
        }

        await mcq.deleteOne();
        res.status(200).json({ success: true, message: "MCQ removed successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Update MCQ
exports.updateMcq = async (req, res) => {
    try {
        let mcq = await Mcq.findById(req.params.id);

        if (!mcq) {
            return res.status(404).json({ success: false, message: "MCQ not found" });
        }

        mcq = await Mcq.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: mcq, message: "MCQ updated!" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};