const DepartmentMember = require('../models/DepartmentMember');

async function checkDepartmentAccess(req, res, next) {
  const departmentId = req.params.id;

  const membership = await DepartmentMember.findOne({
    departmentId: departmentId,
    userId: req.user.userId
  });

  if (!membership) {
    return res.status(403).json({ error: 'Not authorized for this department' });
  }

  req.membership = membership; // isme membership.role milega (hr/team_manager/employee)
  next();
}

module.exports = checkDepartmentAccess;