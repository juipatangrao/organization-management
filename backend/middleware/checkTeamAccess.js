const Team = require('../models/Team');
const TeamMember = require('../models/TeamMember');

async function checkTeamAccess(req, res, next) {
  const teamId = req.params.teamId;
  const userId = req.user.userId;

  const team = await Team.findById(teamId);
  if (!team) {
    return res.status(404).json({ error: 'Team not found' });
  }

  const isManager = team.managerId && team.managerId.toString() === userId;

  const membership = await TeamMember.findOne({ teamId, userId });
  const isMember = !!membership;

  if (!isManager && !isMember) {
    return res.status(403).json({ error: 'Not authorized for this team' });
  }

  req.team = team;
  req.isTeamManager = isManager; // route mein ye use karke decide karenge kya allowed hai
  next();
}

module.exports = checkTeamAccess;