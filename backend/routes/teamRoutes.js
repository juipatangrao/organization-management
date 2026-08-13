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

const {
  objectId,
  teamValidation,
} = require("../middleware/validators");

const authenticate = require("../middleware/authenticate");
const checkRole = require("../middleware/checkRole");
const checkDepartmentAccess = require("../middleware/checkDepartmentAccess");

// CREATE TEAM
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

// GET ALL TEAMS
router.get(
  "/",
  authenticate,
  objectId("id"),
  checkDepartmentAccess,
  validate,
  getTeams
);

// GET TEAM BY ID
router.get(
  "/:teamId",
  authenticate,
  objectId("id"),
  objectId("teamId"),
  checkDepartmentAccess,
  validate,
  getTeamById
);

// UPDATE TEAM
router.put(
  "/:teamId",
  authenticate,
  objectId("id"),
  objectId("teamId"),
  checkDepartmentAccess,
  checkRole("hr"),
  validate,
  updateTeam
);

// DELETE TEAM
router.delete(
  "/:teamId",
  authenticate,
  objectId("id"),
  objectId("teamId"),
  checkDepartmentAccess,
  checkRole("hr"),
  sensitiveLimiter,
  validate,
  deleteTeam
);

module.exports = router;