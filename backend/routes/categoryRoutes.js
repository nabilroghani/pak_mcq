const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// 1. GET ALL CATEGORIES
router.get('/all', async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. ADD NEW CATEGORY
router.post('/add', async (req, res) => {
    try {
        const { name, parent, color } = req.body;
        const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

        const newCategory = new Category({
            name,
            slug,
            parent: parent || null,
            color: color || "from-blue-600 to-blue-800"
        });

        await newCategory.save();
        res.status(201).json({ success: true, data: newCategory });
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ success: false, message: "Already exists!" });
        res.status(400).json({ message: err.message });
    }
});

// 3. UPDATE CATEGORY (Yeh miss tha!)
router.put('/:id', async (req, res) => {
    try {
        const { name, parent } = req.body;
        const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name, slug, parent: parent || null },
            { new: true }
        );

        if (!updatedCategory) return res.status(404).json({ success: false, message: "Not found" });
        res.status(200).json({ success: true, data: updatedCategory });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// 4. DELETE CATEGORY
router.delete('/:id', async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Removed successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;