const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  addTeamMember,
  getTeamMembers,
  removeTeamMember,
} = require("../controllers/teamMemberController");

const validate = require("../middleware/validate");

const {
  objectId,
} = require("../middleware/validators");

router.post(
  "/",
  objectId("id"),
  objectId("teamId"),
  validate,
  addTeamMember
);

router.get(
  "/",
  objectId("id"),
  objectId("teamId"),
  validate,
  getTeamMembers
);

router.delete(
  "/:userId",
  objectId("id"),
  objectId("teamId"),
  objectId("userId"),
  validate,
  removeTeamMember
);

module.exports = router;