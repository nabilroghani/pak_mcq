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

// ADD NEW
exports.addCategory = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        const newCategory = new Category({ name, slug, parent: parent || null });
        await newCategory.save();
        res.status(201).json({ success: true, data: newCategory });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// UPDATE (Final Fix)
exports.updateCategory = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, slug, parent: parent || null },
            { new: true }
        );
        res.status(200).json({ success: true, data: category });
    } catch (err) {
        res.status(500).json({ success: false, message: "Update failed" });
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