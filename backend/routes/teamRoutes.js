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

const { objectId, teamValidation } = require("../middleware/validator");

router.post("/", objectId("id"), teamValidation, validate, createTeam);

router.get("/", objectId("id"), validate, getTeams);

router.get(
  "/:teamId",
  objectId("id"),
  objectId("teamId"),
  validate,
  getTeamById,
);

router.put(
  "/:teamId",
  objectId("id"),
  objectId("teamId"),
  validate,
  updateTeam,
);

router.delete(
  "/:teamId",
  objectId("id"),
  objectId("teamId"),
  validate,
  deleteTeam,
);

module.exports = router;
