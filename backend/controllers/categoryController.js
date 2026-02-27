const Category = require('../models/Category');

// GET ALL
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ADD NEW (Slug Logic Included)
exports.addCategory = async (req, res) => {
    try {
        const { name, parent } = req.body;
        if (!name) return res.status(400).json({ success: false, message: "Name is required" });

        const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

        const newCategory = new Category({
            name,
            slug,
            parent: parent || null
        });

        await newCategory.save();
        res.status(201).json({ success: true, data: newCategory });
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ success: false, message: "Already exists!" });
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// DELETE
exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Category Deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error deleting" });
    }
};