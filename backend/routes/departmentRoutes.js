const express = require("express");

const router = express.Router();

const {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const validate = require("../middleware/validate");   
const { sensitiveLimiter } = require("../middleware/rateLimiter");
const {
  objectId,
  departmentValidation,
} = require("../middleware/validators");

// 👇 NAYE IMPORTS - tumhare middleware
const authenticate = require("../middleware/authenticate");
const checkRole = require("../middleware/checkRole");
const checkDepartmentAccess = require("../middleware/checkDepartmentAccess");
const { getDepartmentAuditLogs } = require("../controllers/auditLogController");

router.post(
  "/",
  authenticate,
  checkRole("hr"),
  departmentValidation,
  validate,
  createDepartment
);

router.get("/", authenticate, getDepartments);

router.get(
  "/:id",
  authenticate,
  objectId("id"),
  validate,
  getDepartmentById
);
router.get(
  "/:id/audit-logs",
  authenticate,
  objectId("id"),
  checkDepartmentAccess,
  validate,
  getDepartmentAuditLogs
);
router.put(
  "/:id",
  authenticate,
  checkRole("hr"),
  objectId("id"),
  validate,
  updateDepartment
);

router.delete(
  "/:id",
  authenticate,
  checkRole("hr"),
  sensitiveLimiter, 
  objectId("id"),
  validate,
  deleteDepartment
);

module.exports = router;