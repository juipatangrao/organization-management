const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  addTeamMember,
  getTeamMembers,
  removeTeamMember,
} = require('../controllers/teamMemberController');

router.post('/', addTeamMember);
router.get('/', getTeamMembers);
router.delete('/:memberId', removeTeamMember);

module.exports = router;