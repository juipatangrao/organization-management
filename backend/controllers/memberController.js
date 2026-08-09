const mongoose = require("mongoose");

const Department = require("../models/Department");
const DepartmentMember = require("../models/DepartmentMember");

const { createAuditLog } = require("../services/auditService");

// ADD MEMBER
exports.addMember = async (req, res) => {
  try {
    const { id: departmentId } = req.params;
    const { userId, role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
      return res.status(400).json({
        message: "Invalid department ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    const existingMember = await DepartmentMember.findOne({
      departmentId,
      userId,
    });

    if (existingMember) {
      return res.status(409).json({
        message: "Employee is already a member of this department",
      });
    }

    const member = await DepartmentMember.create({
      departmentId,
      userId,
      role: role || "employee",
    });

    await createAuditLog({
      action: "MEMBER_ADDED",
      targetUser: userId,
      departmentId,
      details: `User ${userId} added to department`,
    });

    res.status(201).json({
      message: "Member added successfully",
      member,
    });
  } catch (error) {
    console.error("Add member:", error);

    res.status(500).json({
      message: "Failed to add member",
    });
  }
};

// GET MEMBERS
exports.getMembers = async (req, res) => {
  try {
    const { id: departmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
      return res.status(400).json({
        message: "Invalid department ID",
      });
    }

    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    const members = await DepartmentMember.find({
      departmentId,
    })
      .populate("userId", "name email")
      .sort({ joinedAt: -1 });

    res.status(200).json({
      count: members.length,
      members,
    });
  } catch (error) {
    console.error("Get members:", error);

    res.status(500).json({
      message: "Failed to fetch members",
    });
  }
};

// UPDATE MEMBER
exports.updateMember = async (req, res) => {
  try {
    const { id: departmentId, userId } = req.params;
    const { role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
      return res.status(400).json({
        message: "Invalid department ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const allowedRoles = [
      "hr",
      "team_manager",
      "employee",
    ];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const member = await DepartmentMember.findOne({
      departmentId,
      userId,
    });

    if (!member) {
      return res.status(404).json({
        message: "Department member not found",
      });
    }

    const oldRole = member.role;

    member.role = role;

    await member.save();

    await createAuditLog({
      action: "MEMBER_ROLE_CHANGED",
      targetUser: userId,
      departmentId,
      details: `Role changed from ${oldRole} to ${role}`,
    });

    res.status(200).json({
      message: "Member role updated successfully",
      member,
    });
  } catch (error) {
    console.error("Update member:", error);

    res.status(500).json({
      message: "Failed to update member",
    });
  }
};

// REMOVE MEMBER
exports.removeMember = async (req, res) => {
  try {
    const { id: departmentId, userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
      return res.status(400).json({
        message: "Invalid department ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const member = await DepartmentMember.findOneAndDelete({
      departmentId,
      userId,
    });

    if (!member) {
      return res.status(404).json({
        message: "Department member not found",
      });
    }

    await createAuditLog({
      action: "MEMBER_REMOVED",
      targetUser: userId,
      departmentId,
      details: `User ${userId} removed from department`,
    });

    res.status(200).json({
      message: "Member removed successfully",
    });
  } catch (error) {
    console.error("Remove member:", error);

    res.status(500).json({
      message: "Failed to remove member",
    });
  }
};