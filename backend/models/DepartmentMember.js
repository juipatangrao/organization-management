const mongoose = require("mongoose");

const departmentMemberSchema = new mongoose.Schema(
  {
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    role: {
      type: String,
      enum: ["hr", "team_manager", "employee"],
      default: "employee",
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "On Leave"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

// Same user cannot be added twice to same department
departmentMemberSchema.index({ departmentId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("DepartmentMember", departmentMemberSchema);
