const express = require("express");

const router = express.Router();

const { getAuditLogs } = require("../controllers/auditLogController");
const authenticate = require("../middleware/authenticate");
const checkRole = require("../middleware/checkRole");

// Global audit log view — HR only, since it can span all departments
router.get("/", authenticate, checkRole("hr"), getAuditLogs);

module.exports = router;