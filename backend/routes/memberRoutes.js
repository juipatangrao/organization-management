const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  addMember,
  getMembers,
  updateMember,
  removeMember,
} = require('../controllers/memberController');

router.post('/', addMember);
router.get('/', getMembers);
router.put('/:userId', updateMember);
router.delete('/:userId', removeMember);

module.exports = router;