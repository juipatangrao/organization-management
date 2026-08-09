const { body, param } = require("express-validator");

const objectId = (field) =>
  param(field)
    .isMongoId()
    .withMessage(`${field} must be a valid ID`);

const departmentValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Department name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Department name must be 2-100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
];

const teamValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Team name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Team name must be 2-100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
];

const memberValidation = [
  body("userId")
    .isMongoId()
    .withMessage("Invalid user ID"),

  body("role")
    .optional()
    .isIn(["hr", "team_manager", "employee"])
    .withMessage("Invalid role"),
];

module.exports = {
  objectId,
  departmentValidation,
  teamValidation,
  memberValidation,
};