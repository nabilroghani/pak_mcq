const express = require('express');
const router = express.Router();
const { getComments, addComment } = require('../controllers/commentController');

router.get('/:mcqId', getComments);

router.post('/add', addComment);

module.exports = router;