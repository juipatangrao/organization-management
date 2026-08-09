const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  addMember,
  getMembers,
  updateMember,
  removeMember,
} = require("../controllers/memberController");

const validate = require("../middleware/validate");
const { sensitiveLimiter } = require("../middleware/rateLimiter");

const {
  objectId,
  memberValidation,
} = require("../middleware/validators")

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
  memberValidation,
  validate,
  addMember
);

router.get(
  "/",
  authenticate,
  objectId("id"),
  checkDepartmentAccess,
  validate,
  getMembers
);

router.put(
  "/:userId",
  authenticate,
  objectId("id"),
  objectId("userId"),
  checkDepartmentAccess,
  checkRole("hr"),
  validate,
  updateMember
);

router.delete(
  "/:userId",
  authenticate,
  objectId("id"),
  objectId("userId"),
  checkDepartmentAccess,
  checkRole("hr"),
  sensitiveLimiter,
  validate,
  removeMember
);

module.exports = router;