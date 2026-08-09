const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  addMember,
  getMembers,
  updateMember,
  removeMember,
} = require("../controllers/memberController");

const validate = require("../middleware/validate");

const {
  objectId,
  memberValidation,
} = require("../middleware/validators");

router.post(
  "/",
  objectId("id"),
  memberValidation,
  validate,
  addMember
);

router.get(
  "/",
  objectId("id"),
  validate,
  getMembers
);

router.put(
  "/:userId",
  objectId("id"),
  objectId("userId"),
  validate,
  updateMember
);

router.delete(
  "/:userId",
  objectId("id"),
  objectId("userId"),
  validate,
  removeMember
);

module.exports = router;