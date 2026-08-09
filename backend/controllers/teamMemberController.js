const TeamMember = require('../models/TeamMember');

// Add a member to a team
exports.addTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.create({
      teamId: req.params.teamId,
      userId: req.body.userId,
    });
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all members of a team
exports.getTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find({ teamId: req.params.teamId });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove a member from a team
exports.removeTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.memberId);
    if (!member) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Team member removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};