// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const dashboardRoutes = require('./routes/dashboardRoutes'); // Import dashboard routes

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const companyRoutes = require('./routes/companyRoutes'); // Import company routes
app.use('/api/companies', companyRoutes); // Use company routes

app.use('/api/auth', authRoutes); // Use auth routes
app.use('/api/dashboard', dashboardRoutes); // Use dashboard routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
