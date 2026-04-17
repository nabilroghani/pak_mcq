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
const contactRoutes = require('./routes/contactRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userCount = require('./routes/countUsersRoute');

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(express.json()); 

// Professional CORS setup for Production
app.use(cors({
    origin: '*', // Production mein ye requests allow karega
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userCount)
app.use('/api/mcqs', mcqRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/contacts', contactRoutes);
app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
    res.send("Backend Server is Running...");
});

// Port configuration
const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;