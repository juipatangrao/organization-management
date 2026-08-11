const express = require("express");

const router = express.Router();

const { getOrganization, updateOrganization } = require("../controllers/organizationController");
const authenticate = require("../middleware/authenticate");
const checkRole = require("../middleware/checkRole");

router.get("/", authenticate, getOrganization);

router.put("/", authenticate, checkRole("hr"), updateOrganization);

module.exports = router;