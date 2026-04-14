const express = require('express');
const router = express.Router();
const { createQuiz, getQuizBySlug, getLatestQuiz, deleteLatestQuiz } = require('../controllers/quizController');
const { protect, isAdmin } = require('../middleware/auth'); // 'admin' ki jagah 'isAdmin' likhein

router.post('/create', protect, isAdmin, createQuiz);
router.get('/latest', getLatestQuiz); // Ye line zaroori hai frontend ke liye
router.get('/:slug', getQuizBySlug);
router.delete('/delete-latest', protect, isAdmin, deleteLatestQuiz);

module.exports = router;