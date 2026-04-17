// controllers/userController.js
const User = require('../models/User');

exports.getUserCount = async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.status(200).json({ success: true, count });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error counting users" });
    }
};