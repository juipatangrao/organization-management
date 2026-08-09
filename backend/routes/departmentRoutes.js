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

const {
  objectId,
  departmentValidation,
} = require("../middleware/validators");

router.post(
  "/",
  departmentValidation,
  validate,
  createDepartment
);

router.get("/", getDepartments);

router.get(
  "/:id",
  objectId("id"),
  validate,
  getDepartmentById
);

router.put(
  "/:id",
  objectId("id"),
  validate,
  updateDepartment
);

router.delete(
  "/:id",
  objectId("id"),
  validate,
  deleteDepartment
);

module.exports = router;