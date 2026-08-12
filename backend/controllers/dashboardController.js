const Department = require("../models/Department");
const DepartmentMember = require("../models/DepartmentMember");
const Team = require("../models/Team");

exports.getDashboardStats = async (req, res) => {
  try {
    const [totalDepartments, totalEmployees, totalTeams, departments] = await Promise.all([
      Department.countDocuments(),
      DepartmentMember.countDocuments({ status: "Active" }),
      Team.countDocuments(),
      Department.find().select("name"), // just to compute budget sum below
    ]);

    // Sum budgets — assumes you add a `budget` field to Department later;
    // for now this returns 0 if the field doesn't exist yet.
    const budgetAgg = await Department.aggregate([
      { $group: { _id: null, totalBudget: { $sum: "$budget" } } },
    ]);
    const allocatedBudget = budgetAgg[0]?.totalBudget || 0;

    res.status(200).json({
      stats: {
        totalDepartments,
        totalEmployees,
        totalTeams,
        allocatedBudget,
      },
    });
  } catch (error) {
    console.error("Get dashboard stats:", error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};