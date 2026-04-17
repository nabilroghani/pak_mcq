// routes/adminRoutes.js (ya user routes)
const express = require('express');
const router = express.Router();

const { getUserCount } = require('../controllers/usersCountController');
const { protect, isAdmin } = require('../middleware/auth');

router.get('/user-count', protect, isAdmin, getUserCount);

module.exports = router;