const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(express.json());

const memberRoutes = require('./routes/memberRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const teamRoutes = require('./routes/teamRoutes');
const teamMemberRoutes = require('./routes/teamMemberRoutes');

app.use('/api/departments', departmentRoutes);
app.use('/api/departments/:id/members', memberRoutes);
app.use('/api/departments/:id/teams', teamRoutes);
app.use('/api/departments/:id/teams/:teamId/members', teamMemberRoutes);

// Connect MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});