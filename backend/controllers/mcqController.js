const Mcq = require('../models/Mcq');
const Category = require('../models/Category');

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

        if (search && search.trim() !== "") {
            filter.question = { $regex: search, $options: 'i' };
        } 
        else if (category && category !== "undefined") {
            const currentCat = await Category.findOne({ 
                slug: { $regex: new RegExp(`^${category}$`, 'i') } 
            });

            if (currentCat) {
                const childCategories = await Category.find({ parent: currentCat._id });
                
                const allSlugs = [currentCat.slug, ...childCategories.map(c => c.slug)];
                
                const allNames = [currentCat.name, ...childCategories.map(c => c.name)];
                
                const combinedValues = [...allSlugs, ...allNames];

                filter.category = { 
                    $in: combinedValues.map(val => new RegExp(`^${val}$`, 'i')) 
                };

            } else {
                const cleanName = category.replace(/-/g, ' ');
                filter.category = { 
                    $in: [
                        new RegExp(`^${category}$`, 'i'), 
                        new RegExp(`^${cleanName}$`, 'i')
                    ] 
                };
            }
        }

        const mcqs = await Mcq.find(filter).sort({ createdAt: -1 });

        // console.log("Final Filter Applied:", JSON.stringify(filter));

        res.status(200).json({
            success: true,
            count: mcqs.length,
            data: mcqs
        });
    } catch (err) {
        console.error("Fetch Error:", err);
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