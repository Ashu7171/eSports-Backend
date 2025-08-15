const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');

// Load environment variables
dotenv.config();

// Connect to DB
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tournaments', require('./routes/tournamentRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));

const PORT =5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
