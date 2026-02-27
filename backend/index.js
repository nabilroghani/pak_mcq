const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/authRoutes');
const mcqRoutes = require('./routes/mcqRoutes');
const jobRoutes = require('./routes/jobRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(express.json()); 
app.use(cors()); // Localhost ke liye itna kaafi hai

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mcqs', mcqRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
    res.send("Backend Server is Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

module.exports = app;