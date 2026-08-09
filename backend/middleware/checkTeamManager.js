const Team = require('../models/Team');

async function checkTeamManager(req, res, next) {
  const teamId = req.params.teamId;
  const userId = req.user.userId;

  const team = await Team.findById(teamId);
  if (!team) {
    return res.status(404).json({ error: 'Team not found' });
  }

  const isManager = team.managerId && team.managerId.toString() === userId;

  if (!isManager) {
    return res.status(403).json({ error: 'Only the assigned team manager can perform this action' });
  }

  req.team = team;
  next();
}

module.exports = checkTeamManager;