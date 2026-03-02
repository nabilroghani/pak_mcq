const express = require('express');
const router = express.Router();
const { createQuiz, getQuizBySlug } = require('../controllers/quizController');
const { protect, isAdmin } = require('../middleware/auth'); // 'admin' ki jagah 'isAdmin' likhein

// Check karein ke protect aur isAdmin functions sahi load ho rahe hain
router.post('/create', protect, isAdmin, createQuiz);
router.get('/:slug', getQuizBySlug);

module.exports = router;