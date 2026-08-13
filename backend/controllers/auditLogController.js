const AuditLog = require("../models/AuditLog");

// GET audit logs, optionally filtered by department and/or team, paginated
exports.getAuditLogs = async (req, res) => {
  try {
    const { departmentId, teamId, page = 1, limit = 20 } = req.query;

    const filter = {};

    if (departmentId) filter.departmentId = departmentId;
    if (teamId) filter.teamId = teamId;

    const skip = (Number(page) - 1) * Number(limit);

    const [logs, total] = await Promise.all([
      AuditLog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),

      AuditLog.countDocuments(filter),
    ]);

    res.status(200).json({
      count: logs.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      logs,
    });
  } catch (error) {
    console.error("Get audit logs:", error);

    res.status(500).json({
      message: "Failed to fetch audit logs",
      error: error.message,
    });
  }
};


// GET audit logs for one specific department
exports.getDepartmentAuditLogs = async (req, res) => {
  try {
    const { id: departmentId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const [logs, total] = await Promise.all([
      AuditLog.find({ departmentId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),

      AuditLog.countDocuments({ departmentId }),
    ]);

    res.status(200).json({
      count: logs.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      logs,
    });
  } catch (error) {
    console.error("Get department audit logs:", error);

    res.status(500).json({
      message: "Failed to fetch audit logs",
      error: error.message,
    });
  }
};