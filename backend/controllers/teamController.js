const mongoose = require("mongoose");

const Department = require("../models/Department");
const Team = require("../models/Team");
const TeamMember = require("../models/TeamMember");

const { createAuditLog } = require("../services/auditService");

// CREATE TEAM
exports.createTeam = async (req, res) => {
  try {
    const { id: departmentId } = req.params;
    const { name, description, managerId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
      return res.status(400).json({
        message: "Invalid department ID",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Team name is required",
      });
    }

    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    const existingTeam = await Team.findOne({
      departmentId,
      name: name.trim(),
    });

    if (existingTeam) {
      return res.status(409).json({
        message: "Team with this name already exists",
      });
    }

    const team = await Team.create({
      departmentId,
      name: name.trim(),
      description: description?.trim() || "",
      managerId: managerId || null,
    });

    await createAuditLog({
      action: "TEAM_CREATED",
      departmentId,
      teamId: team._id,
      details: `Team "${team.name}" created`,
    });

    res.status(201).json({
      message: "Team created successfully",
      team,
    });
  } catch (error) {
    console.error("Create team:", error);

    res.status(500).json({
      message: "Failed to create team",
    });
  }
};

// GET TEAMS
exports.getTeams = async (req, res) => {
  try {
    const { id: departmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
      return res.status(400).json({
        message: "Invalid department ID",
      });
    }

    const teams = await Team.find({
      departmentId,
    })
      .populate("managerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: teams.length,
      teams,
    });
  } catch (error) {
    console.error("Get teams:", error);

    res.status(500).json({
      message: "Failed to fetch teams",
    });
  }
};

// GET ONE TEAM
exports.getTeamById = async (req, res) => {
  try {
    const { teamId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({
        message: "Invalid team ID",
      });
    }

    const team = await Team.findById(teamId)
      .populate("managerId", "name email")
      .populate("departmentId", "name");

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    const memberCount = await TeamMember.countDocuments({
      teamId,
    });

    res.status(200).json({
      team,
      statistics: {
        totalMembers: memberCount,
      },
    });
  } catch (error) {
    console.error("Get team:", error);

    res.status(500).json({
      message: "Failed to fetch team",
    });
  }
};

// UPDATE TEAM
exports.updateTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { name, description, managerId } = req.body;

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

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          message: "Team name cannot be empty",
        });
      }

      const duplicate = await Team.findOne({
        departmentId: team.departmentId,
        name: name.trim(),
        _id: { $ne: teamId },
      });

      if (duplicate) {
        return res.status(409).json({
          message: "Another team already has this name",
        });
      }

      team.name = name.trim();
    }

    if (description !== undefined) {
      team.description = description.trim();
    }

    if (managerId !== undefined) {
      team.managerId = managerId || null;
    }

    await team.save();

    await createAuditLog({
      action: "TEAM_UPDATED",
      departmentId: team.departmentId,
      teamId: team._id,
      details: `Team "${team.name}" updated`,
    });

    res.status(200).json({
      message: "Team updated successfully",
      team,
    });
  } catch (error) {
    console.error("Update team:", error);

    res.status(500).json({
      message: "Failed to update team",
    });
  }
};

// DELETE TEAM
exports.deleteTeam = async (req, res) => {
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

    await TeamMember.deleteMany({
      teamId,
    });

    await Team.findByIdAndDelete(teamId);

    await createAuditLog({
      action: "TEAM_DELETED",
      departmentId: team.departmentId,
      teamId,
      details: `Team "${team.name}" deleted`,
    });

    res.status(200).json({
      message: "Team and its members deleted successfully",
    });
  } catch (error) {
    console.error("Delete team:", error);

    res.status(500).json({
      message: "Failed to delete team",
    });
  }
};