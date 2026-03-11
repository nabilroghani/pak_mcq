const Category = require('../models/Category');
const Mcq = require('../models/Mcq'); 

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: 1, _id: 1 });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
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
exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const allCategories = await Category.find();
        
        const getChildIds = (parentId, list) => {
            let ids = [parentId];
            list.filter(cat => cat.parent === parentId.toString()).forEach(child => {
                ids = [...ids, ...getChildIds(child._id, list)];
            });
            return ids;
        };

        const idsToDelete = getChildIds(categoryId, allCategories);

        const categoriesToDelete = allCategories.filter(cat => idsToDelete.includes(cat._id));
        const namesAndSlugs = [
            ...categoriesToDelete.map(c => c.name),
            ...categoriesToDelete.map(c => c.slug)
        ];

        
        await Mcq.deleteMany({ 
            category: { $in: namesAndSlugs } 
        });

        await Category.deleteMany({ 
            _id: { $in: idsToDelete } 
        });

        res.status(200).json({ 
            success: true, 
            message: "Parent, all Sub-categories and all MCQs deleted from DB" 
        });

    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).json({ success: false, message: "Error deleting from database" });
    }
};

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