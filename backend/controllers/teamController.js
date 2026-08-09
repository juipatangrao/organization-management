const Team = require('../models/Team');

// Create a team inside a department
exports.createTeam = async (req, res) => {
  try {
    const team = await Team.create({
      departmentId: req.params.id,
      name: req.body.name,
      managerId: req.body.managerId,
    });
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all teams in a department
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find({ departmentId: req.params.id });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one team
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ message: 'Not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a team
exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.teamId, req.body, { new: true });
    if (!team) return res.status(404).json({ message: 'Not found' });
    res.json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a team
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.teamId);
    if (!team) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Team deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};