const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const mcqRoutes = require('./routes/mcqRoutes');
const jobRoutes = require('./routes/jobRoutes');
const commentRoutes = require('./routes/commentRoutes');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors()); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mcqs', mcqRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/comments', commentRoutes);

// Database Connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;