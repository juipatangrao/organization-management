const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true, trim: true },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
    targetUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", default: null, index: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null, index: true },
    details: { type: String, trim: true, maxlength: 1000, default: "" },
    createdAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);