const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// Routes
const departmentRoutes = require("./routes/departmentRoutes");
const memberRoutes = require("./routes/memberRoutes");
const teamRoutes = require("./routes/teamRoutes");
const teamMemberRoutes = require("./routes/teamMemberRoutes");

app.use("/api/departments", departmentRoutes);

app.use(
  "/api/departments/:id/members",
  memberRoutes
);

app.use(
  "/api/departments/:id/teams",
  teamRoutes
);

app.use(
  "/api/departments/:id/teams/:teamId/members",
  teamMemberRoutes
);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Department Management API is running",
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "API endpoint not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error",
  });
});

// Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});