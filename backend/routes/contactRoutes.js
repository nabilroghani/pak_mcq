const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/send', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ success: true, message: "Message sent successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

router.get('/all', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, data: messages });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching messages" });
    }
});

// 2. Message delete karne ke liye
router.delete('/delete/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error deleting" });
    }
});

module.exports = router;