const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamController");

const validate = require("../middleware/validate");
const { sensitiveLimiter } = require("../middleware/rateLimiter");

const { objectId, teamValidation } = require("../middleware/validators");

// 👇 NAYE IMPORTS
const authenticate = require("../middleware/authenticate");
const checkRole = require("../middleware/checkRole");
const checkDepartmentAccess = require("../middleware/checkDepartmentAccess");

router.post(
  "/",
  authenticate,
  objectId("id"),
  checkDepartmentAccess,
  checkRole("hr"),
  teamValidation,
  validate,
  createTeam
);

router.get(
  "/",
  authenticate,
  objectId("id"),
  checkDepartmentAccess,
  validate,
  getTeams
);

router.get(
  "/:teamId",
  authenticate,
  objectId("id"),
  objectId("teamId"),
  checkDepartmentAccess,
  validate,
  getTeamById,
);

router.put(
  "/:teamId",
  authenticate,
  objectId("id"),
  objectId("teamId"),
  checkDepartmentAccess,
  checkRole("hr"),
  validate,
  updateTeam,
);

router.delete(
  "/:teamId",
  authenticate,
  objectId("id"),
  objectId("teamId"),
  checkDepartmentAccess,
  checkRole("hr"),
  sensitiveLimiter,  
  validate,
  deleteTeam,
);

module.exports = router;