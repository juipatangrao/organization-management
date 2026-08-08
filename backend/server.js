const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const memberRoutes = require('./routes/memberRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
app.use('/api/departments', departmentRoutes);
app.use('/api/departments/:id/members', memberRoutes);
app.use(express.json());

// Connect MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});