const DepartmentMember = require("../models/DepartmentMember");

async function checkDepartmentAccess(req, res, next) {
  try {
    const departmentId = req.params.id;

    const membership = await DepartmentMember.findOne({
      departmentId,
      userId: req.user.userId,
    });

    if (!membership) {
      return res.status(403).json({
        error: "Not authorized for this department",
      });
    }

    req.membership = membership;

    next();
  } catch (error) {
    console.error("Department access check:", error);

    return res.status(500).json({
      error: "Failed to verify department access",
    });
  }
}

module.exports = checkDepartmentAccess;