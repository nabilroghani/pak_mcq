const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const mcqRoutes = require('./routes/mcqRoutes');
const jobRoutes = require('./routes/jobRoutes');
const commentRoutes = require('./routes/commentRoutes');
const connectDB = require('./config/db');

const app = express();

// Database Connection (Wait for connection)
connectDB();

// Middleware
app.use(express.json()); 
app.use(cors()); 

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root Route (Testing ke liye taake 404 na aaye)
app.get('/', (req, res) => {
    res.send("API is running...");
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mcqs', mcqRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/comments', commentRoutes);

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app;