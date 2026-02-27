const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// 1. GET ALL CATEGORIES
router.get('/all', async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. ADD NEW CATEGORY
router.post('/add', async (req, res) => {
    try {
        const { name, parent, color } = req.body;
        
        // Slug generation (Auto)
        const slug = name.toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');

        const newCategory = new Category({
            name,
            slug,
            parent: parent || null,
            color: color || "from-blue-600 to-blue-800"
        });

        await newCategory.save();
        res.status(201).json({ success: true, data: newCategory });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: "Category already exists!" });
        }
        res.status(400).json({ message: err.message });
    }
});

// 3. DELETE CATEGORY (Yeh miss tha jiski wajah se 404 aa raha tha)
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Category removed successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error: " + err.message });
    }
});

module.exports = router;