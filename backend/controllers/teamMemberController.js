const mongoose = require("mongoose");

const Team = require("../models/Team");
const DepartmentMember = require("../models/DepartmentMember");
const TeamMember = require("../models/TeamMember");

const { createAuditLog } = require("../services/auditService");

// ADD TEAM MEMBER
exports.addTeamMember = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({
        message: "Invalid team ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    // User must belong to the department first
    const departmentMember = await DepartmentMember.findOne({
      departmentId: team.departmentId,
      userId,
    });

    if (!departmentMember) {
      return res.status(400).json({
        message: "User must be a department member before joining a team",
      });
    }

    const existingMember = await TeamMember.findOne({
      teamId,
      userId,
    });

    if (existingMember) {
      return res.status(409).json({
        message: "User is already a member of this team",
      });
    }

    const member = await TeamMember.create({
      teamId,
      userId,
    });

    await createAuditLog({
      action: "TEAM_MEMBER_ADDED",
      targetUser: userId,
      departmentId: team.departmentId,
      teamId,
      details: `User ${userId} added to team`,
    });

    res.status(201).json({
      message: "Team member added successfully",
      member,
    });
  } catch (error) {
    console.error("Add team member:", error);

    res.status(500).json({
      message: "Failed to add team member",
    });
  }
};

// GET TEAM MEMBERS
exports.getTeamMembers = async (req, res) => {
  try {
    const { teamId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({
        message: "Invalid team ID",
      });
    }

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    const members = await TeamMember.find({
      teamId,
    })
      .populate("userId", "name email")
      .sort({ joinedAt: -1 });

    res.status(200).json({
      count: members.length,
      members,
    });
  } catch (error) {
    console.error("Get team members:", error);

    res.status(500).json({
      message: "Failed to fetch team members",
    });
  }
};

// REMOVE TEAM MEMBER
exports.removeTeamMember = async (req, res) => {
  try {
    const { teamId, userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({
        message: "Invalid team ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    const member = await TeamMember.findOneAndDelete({
      teamId,
      userId,
    });

    if (!member) {
      return res.status(404).json({
        message: "Team member not found",
      });
    }

    await createAuditLog({
      action: "TEAM_MEMBER_REMOVED",
      targetUser: userId,
      departmentId: team.departmentId,
      teamId,
      details: `User ${userId} removed from team`,
    });

    res.status(200).json({
      message: "Team member removed successfully",
    });
  } catch (error) {
    console.error("Remove team member:", error);

    res.status(500).json({
      message: "Failed to remove team member",
    });
  }
};