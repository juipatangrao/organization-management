const AuditLog = require("../models/AuditLog");

const createAuditLog = async ({
  action,
  performedBy = null,
  targetUser = null,
  departmentId = null,
  teamId = null,
  details = "",
}) => {
  try {
    return await AuditLog.create({
      action,
      performedBy,
      targetUser,
      departmentId,
      teamId,
      details,
    });
  } catch (error) {
    console.error("Audit log error:", error.message);
    return null;
  }
};

module.exports = {
  createAuditLog,
};