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


// Authentication / Authorization
const authenticate = require("../middleware/authenticate");
const checkRole = require("../middleware/checkRole");
const checkDepartmentAccess = require("../middleware/checkDepartmentAccess");


const {
  getDepartmentAuditLogs,
} = require("../controllers/auditLogController");



// =====================================================
// GET ALL DEPARTMENTS
// Login नसल्यामुळे development साठी authenticate काढले आहे
// =====================================================


router.get("/", getDepartments);



// =====================================================
// GET SINGLE DEPARTMENT
// =====================================================


router.get(
  "/:id",
  objectId("id"),
  validate,
  getDepartmentById
);



// =====================================================
// CREATE DEPARTMENT
// Authentication + HR role required
// =====================================================


router.post(
  "/",
  authenticate,
  checkRole("hr"),
  departmentValidation,
  validate,
  createDepartment
);



// =====================================================
// UPDATE DEPARTMENT
// Authentication + HR role required
// =====================================================


router.put(
  "/:id",
  authenticate,
  checkRole("hr"),
  objectId("id"),
  validate,
  updateDepartment
);



// =====================================================
// DELETE DEPARTMENT
// Authentication + HR role required
// =====================================================


router.delete(
  "/:id",
  authenticate,
  checkRole("hr"),
  sensitiveLimiter,
  objectId("id"),
  validate,
  deleteDepartment
);



// =====================================================
// DEPARTMENT AUDIT LOGS
// Authentication required
// =====================================================


router.get(
  "/:id/audit-logs",
  authenticate,
  objectId("id"),
  checkDepartmentAccess,
  validate,
  getDepartmentAuditLogs
);



module.exports = router;