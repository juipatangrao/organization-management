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
} = require("../middleware/validators")

// 👇 NAYE IMPORTS
const authenticate = require("../middleware/authenticate");
const checkDepartmentAccess = require("../middleware/checkDepartmentAccess");
const checkTeamManager = require("../middleware/checkTeamManager");

// HR ya is team ka manager hi allowed - custom check
function hrOrTeamManager(req, res, next) {
  if (req.membership && req.membership.role === "hr") {
    return next();
  }
  return checkTeamManager(req, res, next);
}

router.post(
  "/",
  authenticate,
  objectId("id"),
  objectId("teamId"),
  checkDepartmentAccess,
  hrOrTeamManager,
  validate,
  addTeamMember
);

router.get(
  "/",
  authenticate,
  objectId("id"),
  objectId("teamId"),
  checkDepartmentAccess,
  validate,
  getTeamMembers
);

router.delete(
  "/:userId",
  authenticate,
  objectId("id"),
  objectId("teamId"),
  objectId("userId"),
  checkDepartmentAccess,
  hrOrTeamManager,
  validate,
  removeTeamMember
);

module.exports = router;