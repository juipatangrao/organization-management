const AuditLog = require('../models/AuditLog');

async function logAction({ actorId, action, details }) {
  try {
    await AuditLog.create({
      performedBy: actorId,
      action: action,
      details: details
    });
  } catch (err) {
    console.error('Failed to save audit log:', err.message);
    // Important: audit log fail hone se main action fail nahi hona chahiye
  }
}

module.exports = logAction;