const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
} = require('../controllers/teamController');

router.post('/', createTeam);
router.get('/', getTeams);
router.get('/:teamId', getTeamById);
router.put('/:teamId', updateTeam);
router.delete('/:teamId', deleteTeam);

module.exports = router;